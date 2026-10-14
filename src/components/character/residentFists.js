import { Matrix4, Vector3, MathUtils } from 'three';

// This asset has no finger bones. A reversible bind-space corrective curls
// the fingers toward each palm without changing the wrist or cached GLB.
export function createResidentFists(scene) {
 const meshes=[];
 scene.updateMatrixWorld(true);
 scene.traverse(mesh=>{
  if(!mesh.isSkinnedMesh)return;
  const {position,skinIndex,skinWeight}=mesh.geometry.attributes;
  const target=position.clone(),world=new Vector3(),local=new Vector3();
  const bones=mesh.skeleton.bones;
  const matrix=new Matrix4(),term=new Matrix4();
  let changed=0;
  for(let i=0;i<position.count;i++){
   let handIndex=-1,handWeight=0;
   for(let c=0;c<4;c++){
    const index=skinIndex.getComponent(i,c),weight=skinWeight.getComponent(i,c);
    if(/^(Left|Right)Hand$/.test(bones[index].name)&&weight>handWeight){handIndex=index;handWeight=weight;}
   }
   if(handWeight<.65)continue;
   const hand=bones[handIndex];
   mesh.getVertexPosition(i,world);mesh.localToWorld(world);
   local.copy(world);hand.worldToLocal(local);
   // Bone units are centimeters in the generated rig. Preserve the palm,
   // then curl distal fingers into a rounded, loosely closed fist.
   if(local.y<=5.0)continue;
   const travel=local.y-5.0,angle=Math.min(2.8,travel/2.35);
   local.y=5.0+2.35*Math.sin(angle);
   local.z-=2.35*(1-Math.cos(angle));
   hand.localToWorld(local);
   local.lerp(world,1-MathUtils.smoothstep(handWeight,.65,.95));
   // Invert this vertex's exact skin transform to store a bind-space morph.
   matrix.elements.fill(0);
   for(let c=0;c<4;c++){
    const index=skinIndex.getComponent(i,c),weight=skinWeight.getComponent(i,c);
    term.multiplyMatrices(bones[index].matrixWorld,mesh.skeleton.boneInverses[index]);
    for(let j=0;j<16;j++)matrix.elements[j]+=term.elements[j]*weight;
   }
   matrix.premultiply(mesh.bindMatrixInverse).multiply(mesh.bindMatrix).premultiply(mesh.matrixWorld).invert();
   local.applyMatrix4(matrix);target.setXYZ(i,local.x,local.y,local.z);changed++;
  }
  if(!changed)return;
  const index=(mesh.geometry.morphAttributes.position??=[]).length;
  target.name='RelaxedFists';mesh.geometry.morphAttributes.position.push(target);
  mesh.updateMorphTargets();meshes.push({mesh,index});
 });
 return amount=>{for(const {mesh,index}of meshes)mesh.morphTargetInfluences[index]=amount;};
}
