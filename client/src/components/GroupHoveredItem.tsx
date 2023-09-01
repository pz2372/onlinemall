import ItemLove from "./ItemLove";
import ItemEye from "./ItemEye";
import ItemCart from "./ItemCart";

const GroupHoveredItem = () => {
  return (
    <div className="hidden group-hover:flex absolute left-1/2 md:bottom-28 bottom-44 -translate-x-1/2">
      <div className="flex items-center justify-center gap-2 ">
        {/* love */}
        <ItemLove />

        {/* eye */}
        <ItemEye />

        {/* cart */}
        <ItemCart />
      </div>
    </div>
  );
};

export default GroupHoveredItem;
