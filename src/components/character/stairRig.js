import { Vector3 } from 'three';
// Meshy's lower boots blend into the shin and collapse when the ankle bends.
// Keep boots rigid and blend the knee between the correct thigh and shin bones.
export function stabilizeBootWeights(scene,scale,minY){
 const owned=[];const point=new Vector3();
 scene.updateMatrixWorld(true);
 scene.traverse(mesh=>{
  if(!mesh.isSkinnedMesh)return;
  mesh.geometry=mesh.geometry.clone();owned.push(mesh.geometry);
  const {position,skinIndex,skinWeight}=mesh.geometry.attributes;
  const sides=['Left','Right'].map(side=>({
   foot:mesh.skeleton.bones.findIndex(b=>b.name===side+'Foot'),
   leg:mesh.skeleton.bones.findIndex(b=>b.name===side+'Leg'),
   toe:mesh.skeleton.bones.findIndex(b=>b.name===side+'ToeBase'),
   thigh:mesh.skeleton.bones.findIndex(b=>b.name===side+'UpLeg'),
  }));
  for(let i=0;i<position.count;i++){
   point.fromBufferAttribute(position,i).applyMatrix4(mesh.matrixWorld);
   const height=(point.y-minY)*scale;
   if(height>.22&&height<.78){
    const side=sides.reduce((best,candidate)=>{
     const x=mesh.skeleton.bones[candidate.leg].getWorldPosition(new Vector3()).x;
     const bx=mesh.skeleton.bones[best.leg].getWorldPosition(new Vector3()).x;
     return Math.abs(point.x-x)<Math.abs(point.x-bx)?candidate:best;
    },sides[0]);
    const knee=(mesh.skeleton.bones[side.leg].getWorldPosition(new Vector3()).y-minY)*scale;
    let t=Math.max(0,Math.min(1,(height-knee+.085)/.17));t=t*t*(3-2*t);
    skinIndex.setXYZW(i,side.thigh,side.leg,0,0);skinWeight.setXYZW(i,t,1-t,0,0);
    continue;
   }
   if(height>.13)continue;
   for(const side of sides){
    if(side.foot<0)continue;
    let weight=0;
    for(let j=0;j<4;j++)if([side.foot,side.leg,side.toe].includes(skinIndex.getComponent(i,j)))weight+=skinWeight.getComponent(i,j);
    if(weight>.8){skinIndex.setXYZW(i,side.foot,0,0,0);skinWeight.setXYZW(i,1,0,0,0);break;}
   }
  }
  skinIndex.needsUpdate=true;skinWeight.needsUpdate=true;
 });
 return owned;
}

export function measureBootContacts(scene,scale){
 const result={};const point=new Vector3();
 scene.updateMatrixWorld(true);
 for(const side of ['Left','Right']){
  let minY=Infinity,minZ=Infinity,maxZ=-Infinity;
  scene.traverse(mesh=>{
   if(!mesh.isSkinnedMesh)return;
   const {position,skinIndex,skinWeight}=mesh.geometry.attributes;
   const foot=mesh.skeleton.bones.findIndex(b=>b.name===side+'Foot');
   const toe=mesh.skeleton.bones.findIndex(b=>b.name===side+'ToeBase');
   for(let i=0;i<position.count;i++){
    // Soles can be weighted to the toe bone as well as the ankle. Using only
    // rigid ankle vertices misses the bottom of V4's shoes by several cm.
    let supportWeight=0;
    for(let j=0;j<4;j++){const joint=skinIndex.getComponent(i,j);if(joint===foot||joint===toe)supportWeight+=skinWeight.getComponent(i,j);}
    if(supportWeight<.5)continue;
    mesh.getVertexPosition(i,point).applyMatrix4(mesh.matrixWorld);
    minY=Math.min(minY,point.y);minZ=Math.min(minZ,point.z);maxZ=Math.max(maxZ,point.z);
   }
  });
  scene.getObjectByName(side+'Foot').getWorldPosition(point);
  result[side]={height:(point.y-minY)*scale+.003,forward:(point.z-(minZ+maxZ)/2)*scale};
 }
 return result;
}
