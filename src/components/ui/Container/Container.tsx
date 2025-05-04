// import React, { ReactNode } from "react";

// export default function Container({ children }: { children: ReactNode }) {
//   return <div className="max-w-[1400px] px-3 mx-auto">{children}</div>;
// }
import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 mx-auto max-w-[480px] md:max-w-[768px] lg:max-w-[1400px]">
      {children}
    </div>
  );
}
