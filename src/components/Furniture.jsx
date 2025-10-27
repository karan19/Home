import React from 'react';
import KitchenIsland from './furniture/KitchenIsland';
import Kitchen from './furniture/Kitchen';
import Refrigerator from './furniture/Refrigerator';
import Sofa from './furniture/Sofa';
import TV from './furniture/TV';
import PlayStation from './furniture/PlayStation';
import PSController from './furniture/PSController';
import BarcelonaCrest from './furniture/BarcelonaCrest';
import Bed from './furniture/Bed';
import Bookshelf from './furniture/Bookshelf';
import CoffeeTable from './furniture/CoffeeTable';
import WorkDesk from './furniture/WorkDesk';
import AccentChair from './furniture/AccentChair';
import SmallTable from './furniture/SmallTable';
import PottedPlant from './furniture/PottedPlant';
import Rug from './furniture/Rug';
import WallClock from './furniture/WallClock';
import TVTable from './furniture/TVTable';
import WaterCooler from './furniture/WaterCooler';
import DrawerTable from './furniture/DrawerTable';
import BluetoothSpeaker from './furniture/BluetoothSpeaker';
import OpenBook from './furniture/OpenBook';
import Pen from './furniture/Pen';
import CoffeeMachine from './furniture/CoffeeMachine';
import CoffeeStationTable from './furniture/CoffeeStationTable';
import MessiPoster from './furniture/MessiPoster';
import PunchingBag from './furniture/PunchingBag';
import AliPoster from './furniture/AliPoster';
import Pillow from './furniture/Pillow';
import JobsPoster from './furniture/JobsPoster';
import MuskPoster from './furniture/MuskPoster';
import BezosPost from './furniture/BezosPost';

function Furniture() {
  return (
    <group name="Furniture">
      <group name="Furniture_GroundLevel">
        <group name="Kitchen">
          {/* Kitchen Island with bar stools */}
          <KitchenIsland position={[-1.5, 0, -1.5]} />
          
          {/* Kitchen counter with stove, sink, and toaster (behind island) */}
          <Kitchen position={[-1.75, 0, -3.5]} />
          
          {/* French door refrigerator (left side of cabinets) */}
          <Refrigerator position={[-3.5, 0, -3.5]} />
        </group>
        <group name="Living">
          {/* Sofa with rounded cushions */}
          <Sofa position={[1.5, 0, 1]} />
          
          {/* Coffee table between sofa and TV */}
          <CoffeeTable position={[1.5, 0, 2.3]} />
          
          {/* TV Table with 4 legs */}
          <TVTable position={[1.5, 0, 3.7]} />
          
          {/* TV on table (near front wall) */}
          <TV position={[1.5, 0.875, 3.7]} rotation={[0, Math.PI, 0]} />
          
          {/* PlayStation console (on table) */}
          <PlayStation position={[1.5, 0.525, 3.6]} />
          
          {/* PS Controller (on sofa) */}
          <PSController position={[1.3, 0.5, 1.2]} rotation={[0, 0.3, 0]} />
          
          {/* Barcelona Crest on right wall */}
          <BarcelonaCrest position={[3.7, 1.5, 1]} rotation={[0, -Math.PI / 2, 0]} />
          
          {/* Messi Poster on right wall (appears when TV plays) */}
          <MessiPoster />
          
          {/* Ali Poster on right wall (appears when punching bag is clicked) */}
          <AliPoster />
          
          {/* Bookshelf in back-right corner, against back wall, facing TV */}
          <Bookshelf position={[3.25, 0, -3.55]} rotation={[0, 0, 0]} />
          
          {/* Water cooler at K16 (pulled forward from back wall) */}
          <WaterCooler position={[1.25, 0, -3.55]} />
          
          {/* Coffee station table at I16 (pulled forward to avoid wall) */}
          <CoffeeStationTable position={[0.25, 0, -3.4]} />
          
          {/* Coffee machine on table at I16 */}
          <CoffeeMachine position={[0.25, 0.825, -3.4]} />
        </group>
      </group>
      <group name="Furniture_UpperLevel">
        {/* Bed in back-right corner (where back wall meets right wall) */}
        <Bed position={[2.5, 3, -2.5]} rotation={[0, 0, 0]} />
        
        {/* Pillow on bed (clickable for Steve Jobs audio) */}
        <Pillow position={[2.5, 3.9, -2.3]} />
        
        {/* Jobs Poster on right wall (appears when pillow is clicked) */}
        <JobsPoster />
        
        {/* Musk Poster on back wall (appears when MacBook is clicked) */}
        <MuskPoster />
        
        {/* Bezos Poster on right wall (appears when OpenBook is clicked) */}
        <BezosPost />
        
        {/* Work desk with MacBook, monitor, and chair (against left wall) */}
        <WorkDesk position={[-3, 3, -2]} rotation={Math.PI / 2} />
        
        {/* Seating area on upper landing (chairs facing each other) */}
        <AccentChair position={[0, 3, 1]} rotation={Math.PI / 2} />
        <SmallTable position={[1, 3, 1]} />
        <AccentChair position={[2, 3, 1]} rotation={-Math.PI / 2} />
        
        {/* Blog writing setup on small table (J6-K7 area) */}
        <OpenBook position={[0.95, 3.525, 1.05]} rotation={[0, 0.3, 0]} />
        <Pen position={[1.08, 3.525, 0.95]} rotation={[0, 0, Math.PI / 2.2]} />
        
        {/* Potted plants (in square C1, side by side) */}
        <PottedPlant position={[-1.7, 3, 3.5]} height={1.2} />
        <PottedPlant position={[-1.3, 3, 3.5]} height={1} />
        
        {/* Rug on upper floor (covers D7, E7, D6, E6 - all 4 squares) */}
        <Rug position={[-0.5, 3, -2.5]} width={2} depth={2} />
        
        {/* Wall clock (at G11 on back wall, upper floor) */}
        <WallClock position={[-0.5, 5.25, -3.6]} scale={1} />
        
        {/* Drawer table at A15 (upper floor, back-left corner) */}
        <DrawerTable position={[-3.75, 3, -3.25]} />
        
        {/* Bluetooth speaker on drawer table */}
        <BluetoothSpeaker position={[-3.75, 3.6, -3.25]} />
        
        {/* Punching bag at N2 (upper floor, front area) */}
        <PunchingBag position={[2.75, 3, 3.25]} />
      </group>
    </group>
  );
}

export default Furniture;
