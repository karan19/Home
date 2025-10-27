import React from 'react';
// Ground Floor - Kitchen
import KitchenIsland from './ground-floor/kitchen/KitchenIsland';
import Kitchen from './ground-floor/kitchen/Kitchen';
import Refrigerator from './ground-floor/kitchen/Refrigerator';
import CoffeeMachine from './ground-floor/kitchen/CoffeeMachine';
import CoffeeStationTable from './ground-floor/kitchen/CoffeeStationTable';
import WaterCooler from './ground-floor/kitchen/WaterCooler';
import BarStool from './ground-floor/kitchen/BarStool';

// Ground Floor - Living Room
import Sofa from './ground-floor/living-room/Sofa';
import CoffeeTable from './ground-floor/living-room/CoffeeTable';
import BarcelonaCrest from './ground-floor/living-room/BarcelonaCrest';
import Bookshelf from './ground-floor/living-room/Bookshelf';

// Ground Floor - Entertainment
import TV from './ground-floor/entertainment/TV';
import TVTable from './ground-floor/entertainment/TVTable';
import PlayStation from './ground-floor/entertainment/PlayStation';
import PSController from './ground-floor/entertainment/PSController';

// Upper Floor - Bedroom
import Bed from './upper-floor/bedroom/Bed';
import Pillow from './upper-floor/bedroom/Pillow';

// Upper Floor - Office
import WorkDesk from './upper-floor/office/WorkDesk';

// Upper Floor - Seating Area
import AccentChair from './upper-floor/seating-area/AccentChair';
import SmallTable from './upper-floor/seating-area/SmallTable';
import OpenBook from './upper-floor/seating-area/OpenBook';
import Pen from './upper-floor/seating-area/Pen';

// Upper Floor - Fitness
import PunchingBag from './upper-floor/fitness/PunchingBag';

// Upper Floor - Decorations
import Rug from './upper-floor/decorations/Rug';
import WallClock from './upper-floor/decorations/WallClock';
import DrawerTable from './upper-floor/decorations/DrawerTable';
import BluetoothSpeaker from './upper-floor/decorations/BluetoothSpeaker';
import PottedPlant from './upper-floor/decorations/PottedPlant';

// Interactive Posters
import MessiPoster from './interactive/MessiPoster';
import AliPoster from './interactive/AliPoster';
import JobsPoster from './interactive/JobsPoster';
import MuskPoster from './interactive/MuskPoster';
import BezosPost from './interactive/BezosPost';

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
