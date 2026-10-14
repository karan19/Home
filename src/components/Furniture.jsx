import { getFeatureConfig } from '../config/interactiveFeatures';
import SportsMemorabilia from './interactive/SportsMemorabilia';
import AnimatedPoster from './interactive/AnimatedPoster';
import React from 'react';
// Coordinate Configurations
import { ENTERTAINMENT, LIVING_ROOM, KITCHEN } from '../config/groundFloorCoordinates';
import { BEDROOM, OFFICE, SEATING_AREA, FITNESS, DECORATIONS } from '../config/upperFloorCoordinates';

// Ground Floor - Kitchen
import KitchenIsland from './ground-floor/kitchen/KitchenIsland';
import Kitchen from './ground-floor/kitchen/Kitchen';
import Refrigerator from './ground-floor/kitchen/Refrigerator';
import CoffeeMachine from './ground-floor/kitchen/CoffeeMachine';
import CoffeeStationTable from './ground-floor/kitchen/CoffeeStationTable';
import WaterCooler from './ground-floor/kitchen/WaterCooler';

// Ground Floor - Living Room
import Sofa from './ground-floor/living-room/Sofa';
import CoffeeTable from './ground-floor/living-room/CoffeeTable';
import WorldCupDisplay from './ground-floor/living-room/WorldCupDisplay';
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
          <KitchenIsland position={KITCHEN.kitchenIsland.position} />
          
          {/* Kitchen counter with stove, sink, and toaster (behind island) */}
          <Kitchen position={KITCHEN.kitchen.position} />
          
          {/* French door refrigerator (left side of cabinets) */}
          <Refrigerator position={KITCHEN.refrigerator.position} />
        </group>
        <group name="Living">
          {/* Sofa with rounded cushions */}
          <Sofa position={LIVING_ROOM.sofa.position} />
          
          {/* Coffee table between sofa and TV */}
          <CoffeeTable position={LIVING_ROOM.coffeeTable.position} />
          
          {/* TV Table with 4 legs */}
          <TVTable position={ENTERTAINMENT.tvTable.position} />
          
          {/* TV on table (near front wall) */}
          <TV position={ENTERTAINMENT.tv.position} rotation={ENTERTAINMENT.tv.rotation} />
          
          <WorldCupDisplay />
          <SportsMemorabilia featureName="sachin" />
          <AnimatedPoster featureName="sachin" />

          {/* PlayStation console (on table) */}
          <PlayStation position={ENTERTAINMENT.playstation.position} />
          
          {/* PS Controller (on sofa) */}
          <PSController position={ENTERTAINMENT.psController.position} rotation={ENTERTAINMENT.psController.rotation} />
          
          {/* Barcelona Crest on right wall */}
          <BarcelonaCrest position={LIVING_ROOM.barcelonaCrest.position} rotation={LIVING_ROOM.barcelonaCrest.rotation} />
          
          {/* Messi Poster on right wall (appears when TV plays) */}
          <MessiPoster />
          
          {/* Ali Poster on right wall (appears when punching bag is clicked) */}
          <AliPoster />
          
          {/* Bookshelf in back-right corner, against back wall, facing TV */}
          <Bookshelf position={LIVING_ROOM.bookshelf.position} rotation={LIVING_ROOM.bookshelf.rotation} />
          
          {/* Water cooler at K16 (pulled forward from back wall) */}
          <WaterCooler position={KITCHEN.waterCooler.position} />
          
          {/* Coffee station table at I16 (pulled forward to avoid wall) */}
          <CoffeeStationTable position={KITCHEN.coffeeStationTable.position} />
          
          {/* Coffee machine on table at I16 */}
          <CoffeeMachine position={KITCHEN.coffeeMachine.position} />
        </group>
      </group>
      <group name="Furniture_UpperLevel">
        {/* Bed in back-right corner (where back wall meets right wall) */}
        <Bed position={BEDROOM.bed.position} rotation={BEDROOM.bed.rotation} />
        
        {/* Pillow on bed (clickable for Steve Jobs audio) */}
        <Pillow position={BEDROOM.pillow.position} />
        
        {/* Jobs Poster on right wall (appears when pillow is clicked) */}
        <JobsPoster />
        
        {/* Musk Poster on back wall (appears when MacBook is clicked) */}
        <MuskPoster />
        
        {/* Bezos Poster on right wall (appears when OpenBook is clicked) */}
        <BezosPost />
        <AnimatedPoster featureName="kalam" />
        <AnimatedPoster featureName="einstein" />
        <AnimatedPoster featureName="huberman" />
        <SportsMemorabilia featureName="jordan" />
        {getFeatureConfig('jordan').poster.image && <AnimatedPoster featureName="jordan" />}
        <SportsMemorabilia featureName="federer" />
        <AnimatedPoster featureName="federer" />
        
        {/* Work desk with MacBook, monitor, and chair (against left wall) */}
        <WorkDesk position={OFFICE.workDesk.position} rotation={OFFICE.workDesk.rotation} />
        
        {/* Seating area on upper landing (chairs facing each other) */}
        <AccentChair position={SEATING_AREA.accentChair1.position} rotation={SEATING_AREA.accentChair1.rotation} />
        <SmallTable position={SEATING_AREA.smallTable.position} />
        <AccentChair position={SEATING_AREA.accentChair2.position} rotation={SEATING_AREA.accentChair2.rotation} />
        
        {/* Blog writing setup on small table (J6-K7 area) */}
        <OpenBook position={SEATING_AREA.openBook.position} rotation={SEATING_AREA.openBook.rotation} />
        <Pen position={SEATING_AREA.pen.position} rotation={SEATING_AREA.pen.rotation} />
        
        {/* Potted plants (in square C1, side by side) */}
        <PottedPlant position={DECORATIONS.pottedPlant1.position} height={DECORATIONS.pottedPlant1.height} rotation={DECORATIONS.pottedPlant1.rotation} />
        <PottedPlant position={DECORATIONS.pottedPlant2.position} height={DECORATIONS.pottedPlant2.height} rotation={DECORATIONS.pottedPlant2.rotation} />
        
        {/* Rug on upper floor (covers D7, E7, D6, E6 - all 4 squares) */}
        <Rug position={DECORATIONS.rug.position} width={DECORATIONS.rug.width} depth={DECORATIONS.rug.depth} />
        
        {/* Wall clock (at G11 on back wall, upper floor) */}
        <WallClock position={DECORATIONS.wallClock.position} scale={DECORATIONS.wallClock.scale} />
        
        {/* Drawer table at A15 (upper floor, back-left corner) */}
        <DrawerTable position={DECORATIONS.drawerTable.position} />
        
        {/* Bluetooth speaker on drawer table */}
        <BluetoothSpeaker position={DECORATIONS.bluetoothSpeaker.position} />
        
        {/* Punching bag at N2 (upper floor, front area) */}
        <PunchingBag position={FITNESS.punchingBag.position} />
      </group>
    </group>
  );
}

export default Furniture;
