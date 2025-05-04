import DesktopHeader from "./DesktopHeader";
import TabletHeader from "./TabletHeader";

const HeaderSection = () => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopHeader />
      </div>

      {/* TabletNav: visible on md to lg */}
      <div className="block lg:hidden">
        <TabletHeader />
      </div>
    </>
  );
};

export default HeaderSection;
