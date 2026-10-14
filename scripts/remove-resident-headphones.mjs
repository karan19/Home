import fs from 'node:fs';
import sharp from 'sharp';
const source='public/models/lofi-resident-v2/walking.glb';
const b=fs.readFileSync(source),jsonSize=b.readUInt32LE(12),j=JSON.parse(b.subarray(20,20+jsonSize));
let binary=Buffer.from(b.subarray(28+jsonSize));
function accessor(i){const a=j.accessors[i],v=j.bufferViews[a.bufferView],size={VEC3:3,VEC2:2,SCALAR:1}[a.type],bytes=a.componentType===5123?2:4;return {count:a.count,size,offset:(v.byteOffset??0)+(a.byteOffset??0),stride:v.byteStride??size*bytes,read(k,c=0){const o=this.offset+k*this.stride+c*bytes;return a.componentType===5126?binary.readFloatLE(o):bytes===2?binary.readUInt16LE(o):binary.readUInt32LE(o);},write(k,c,value){binary.writeFloatLE(value,this.offset+k*this.stride+c*4);}};}
const primitive=j.meshes[0].primitives[0],pos=accessor(primitive.attributes.POSITION),uv=accessor(primitive.attributes.TEXCOORD_0),index=accessor(primitive.indices);
const image=j.images[j.textures[j.materials[0].pbrMetallicRoughness.baseColorTexture.index].source],view=j.bufferViews[image.bufferView];
const {data,info}=await sharp(binary.subarray(view.byteOffset,view.byteOffset+view.byteLength)).removeAlpha().raw().toBuffer({resolveWithObject:true});
const chosen=new Set();
for(let i=0;i<pos.count;i++){
 const x=pos.read(i,0),y=pos.read(i,1),z=pos.read(i,2);
 const px=Math.max(0,Math.min(info.width-1,Math.round(uv.read(i,0)*(info.width-1)))),py=Math.max(0,Math.min(info.height-1,Math.round(uv.read(i,1)*(info.height-1))));
 const k=(py*info.width+px)*3,[r,g,blue]=data.subarray(k,k+3);
 if(y>1.27&&y<1.475&&Math.abs(x)<.165&&(z>.0||y>1.38)){chosen.add(i);}
}
console.log('headphone vertices',chosen.size, [...chosen].slice(0,3).map(i=>[pos.read(i,0),pos.read(i,1),pos.read(i,2)]));
// Smooth the raised ear cups into the sweater/neck envelope instead of cutting holes.
for(const i of chosen){const y=pos.read(i,1),z=pos.read(i,2),x=pos.read(i,0);const t=Math.max(0,Math.min(1,(y-1.32)/.10));pos.write(i,2,Math.min(z,.075-.035*t));pos.write(i,0,Math.sign(x)*Math.min(Math.abs(x),.12-.05*t));}
for(let f=0;f<index.count;f+=3){const ids=[index.read(f),index.read(f+1),index.read(f+2)];if(!ids.some(i=>chosen.has(i)))continue;
 const pts=ids.map(i=>[uv.read(i,0)*(info.width-1),uv.read(i,1)*(info.height-1)]);
 const minX=Math.max(0,Math.floor(Math.min(...pts.map(p=>p[0])))-2),maxX=Math.min(info.width-1,Math.ceil(Math.max(...pts.map(p=>p[0])))+2);
 const minY=Math.max(0,Math.floor(Math.min(...pts.map(p=>p[1])))-2),maxY=Math.min(info.height-1,Math.ceil(Math.max(...pts.map(p=>p[1])))+2);
 const edge=(a,b,x,y)=>(x-a[0])*(b[1]-a[1])-(y-a[1])*(b[0]-a[0]);
 for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
  const e=pts.map((p,i)=>edge(p,pts[(i+1)%3],x,y));if(!(e.every(v=>v>=-3)||e.every(v=>v<=3)))continue;
  const k=(y*info.width+x)*3;data[k]=203;data[k+1]=199;data[k+2]=187;
 }
}
const png=await sharp(data,{raw:info}).png().toBuffer();binary=Buffer.concat([binary,Buffer.alloc((4-binary.length%4)%4)]);
image.bufferView=j.bufferViews.length;image.mimeType='image/png';j.bufferViews.push({buffer:0,byteOffset:binary.length,byteLength:png.length});binary=Buffer.concat([binary,png,Buffer.alloc((4-png.length%4)%4)]);j.buffers[0].byteLength=binary.length;
// Replace the fused accessory band with a smooth, closed sweater collar.
function appendAccessor(values,componentType,type){
 const bytes=componentType===5126?4:componentType===5125?4:2;
 const raw=Buffer.alloc(values.length*bytes);values.forEach((v,i)=>componentType===5126?raw.writeFloatLE(v,i*bytes):componentType===5125?raw.writeUInt32LE(v,i*bytes):raw.writeUInt16LE(v,i*bytes));
 binary=Buffer.concat([binary,Buffer.alloc((4-binary.length%4)%4)]);
 const viewIndex=j.bufferViews.length;j.bufferViews.push({buffer:0,byteOffset:binary.length,byteLength:raw.length});binary=Buffer.concat([binary,raw]);
 const count=values.length/({SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[type]);const a={bufferView:viewIndex,componentType,count,type};
 if(type==='VEC3'&&componentType===5126){a.min=[0,1,2].map(k=>Math.min(...values.filter((_,i)=>i%3===k)));a.max=[0,1,2].map(k=>Math.max(...values.filter((_,i)=>i%3===k)));}
 j.accessors.push(a);return j.accessors.length-1;
}
const retained=[];
for(let f=0;f<index.count;f+=3){const ids=[index.read(f),index.read(f+1),index.read(f+2)];const x=ids.reduce((n,i)=>n+pos.read(i,0),0)/3,y=ids.reduce((n,i)=>n+pos.read(i,1),0)/3;if(!(y>1.275&&y<1.475&&Math.abs(x)<.17))retained.push(...ids);}
primitive.indices=appendAccessor(retained,5125,'SCALAR');
let fabricVertex=0,fabricDistance=Infinity;
for(let i=0;i<pos.count;i++){const d=pos.read(i,0)**2+(pos.read(i,1)-1.14)**2+(pos.read(i,2)-.12)**2;if(d<fabricDistance){fabricDistance=d;fabricVertex=i;}}
const fabricUV=[uv.read(fabricVertex,0),uv.read(fabricVertex,1)];
const collarUV=[],collarPos=[],collarNormal=[],collarJoints=[],collarWeights=[],collarIndices=[];
const spineJoint=j.skins[0].joints.findIndex(i=>j.nodes[i].name==='Spine02');
for(let ring=0;ring<=12;ring++)for(let k=0;k<=40;k++){
 const t=ring/12,theta=k/40*Math.PI*2;
 const shoulder=Math.max(0,Math.min(1,(t-.55)/.25));const eased=shoulder*shoulder*(3-2*shoulder);
 const rx=.174*(1-eased)+.055*eased,rz=.105*(1-eased)+.047*eased;
 collarPos.push(Math.cos(theta)*rx,1.27+.205*t,Math.sin(theta)*rz);
 collarUV.push(fabricUV[0]+(k/40-.5)*.022,fabricUV[1]+(t-.5)*.035);
 collarNormal.push(Math.cos(theta),.3,Math.sin(theta));collarJoints.push(spineJoint,0,0,0);collarWeights.push(1,0,0,0);
 if(ring<12&&k<40){const a=ring*41+k,b=a+41;collarIndices.push(a,b,a+1,a+1,b,b+1);}
}
j.materials.push({name:'Clean_sweater_collar',doubleSided:true,pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],baseColorTexture:{...j.materials[0].pbrMetallicRoughness.baseColorTexture},roughnessFactor:.95,metallicFactor:0}});
j.meshes[0].primitives.push({attributes:{TEXCOORD_0:appendAccessor(collarUV,5126,'VEC2'),POSITION:appendAccessor(collarPos,5126,'VEC3'),NORMAL:appendAccessor(collarNormal,5126,'VEC3'),JOINTS_0:appendAccessor(collarJoints,5123,'VEC4'),WEIGHTS_0:appendAccessor(collarWeights,5126,'VEC4')},indices:appendAccessor(collarIndices,5125,'SCALAR'),material:j.materials.length-1});
binary=Buffer.concat([binary,Buffer.alloc((4-binary.length%4)%4)]);j.buffers[0].byteLength=binary.length;
for(const m of j.materials){delete m.normalTexture;delete m.occlusionTexture;delete m.pbrMetallicRoughness.metallicRoughnessTexture;}
const raw=Buffer.from(JSON.stringify(j)),json=Buffer.concat([raw,Buffer.alloc((4-raw.length%4)%4,32)]),head=Buffer.alloc(20),binHead=Buffer.alloc(8);head.writeUInt32LE(0x46546c67);head.writeUInt32LE(2,4);head.writeUInt32LE(28+json.length+binary.length,8);head.writeUInt32LE(json.length,12);head.writeUInt32LE(0x4e4f534a,16);binHead.writeUInt32LE(binary.length);binHead.writeUInt32LE(0x004e4942,4);
fs.writeFileSync('public/models/lofi-resident-v2/no-headphones.glb',Buffer.concat([head,json,binHead,binary]));
