import { TBrandSidebarFilterProps } from "../../types/props.type";
import styles from "../../components/brand/brand.module.scss";
import ColorFilter from "../productFilters/ColorFilter";
import SizeFilter from "../productFilters/SizeFilter";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";
import CategoryFilter from "../productFilters/CategoryFilter";

const BrandSidebarFilter = ({
  menCategories,
  setMenCategories,
  womenCategories,
  setWomenCategories,
  colors,
  setColors,
  sizes,
  setSizes,
  minRangeVal,
  setMinRangeVal,
  maxRangeVal,
  setMaxRangeVal,
}: TBrandSidebarFilterProps) => {
  return (
    <div className={`${styles.brandSidebarFilter}`}>
      <div className="mb-3">
        <CategoryFilter
          menCategories={menCategories}
          setMenCategories={setMenCategories}
          womenCategories={womenCategories}
          setWomenCategories={setWomenCategories}
        />
      </div>
      <div className="mb-3">
        <ColorFilter colors={colors} setColors={setColors} />
      </div>
      <div className="mb-3">
        <SizeFilter sizes={sizes} setSizes={setSizes} />
      </div>
      <div className="mb-20">
        <MultiRangeSlider
          min={0}
          max={100}
          minRangeVal={minRangeVal}
          maxRangeVal={maxRangeVal}
          setMinRangeVal={setMinRangeVal}
          setMaxRangeVal={setMaxRangeVal}
        />
      </div>
    </div>
  );
};

export default BrandSidebarFilter;
