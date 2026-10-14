import { Vector3, Quaternion } from 'three';
// Two-bone IK in world space; the pole keeps elbows / knees bending consistently.
const a=new Vector3(),b=new Vector3(),c=new Vector3(),direction=new Vector3(),pole=new Vector3(),elbow=new Vector3();
const q=new Quaternion(),worldQ=new Quaternion(),parentQ=new Quaternion();
function aim(bone,child,target){
 bone.getWorldPosition(a);child.getWorldPosition(b);
 q.setFromUnitVectors(b.sub(a).normalize(),c.copy(target).sub(a).normalize());
 bone.getWorldQuaternion(worldQ);bone.parent.getWorldQuaternion(parentQ);
 bone.quaternion.copy(parentQ.invert().multiply(q.multiply(worldQ)));
 bone.updateWorldMatrix(false,true);
}
export function solveLimb(upper,lower,end,target,polePoint,weight=1){
 if(!upper||!lower||!end||weight<.001)return;
 const originalUpper=upper.quaternion.clone(),originalLower=lower.quaternion.clone();
 upper.getWorldPosition(a);lower.getWorldPosition(b);end.getWorldPosition(c);
 const origin=a.clone();const l1=a.distanceTo(b),l2=b.distanceTo(c);
 direction.copy(target).sub(origin);const d=Math.min(l1+l2-.001,Math.max(.001,direction.length()));direction.normalize();
 pole.copy(polePoint).sub(origin).addScaledVector(direction,-pole.copy(polePoint).sub(origin).dot(direction)).normalize();
 const along=(l1*l1-l2*l2+d*d)/(2*d);const height=Math.sqrt(Math.max(0,l1*l1-along*along));
 elbow.copy(origin).addScaledVector(direction,along).addScaledVector(pole,height);
 aim(upper,lower,elbow);aim(lower,end,target);
 upper.quaternion.slerpQuaternions(originalUpper,upper.quaternion.clone(),weight);
 lower.quaternion.slerpQuaternions(originalLower,lower.quaternion.clone(),weight);
 upper.updateWorldMatrix(false,true);
}
