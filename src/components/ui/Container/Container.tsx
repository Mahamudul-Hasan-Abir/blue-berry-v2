// import React, { ReactNode } from "react";

// export default function Container({ children }: { children: ReactNode }) {
//   return <div className="max-w-[1400px] px-3 mx-auto">{children}</div>;
// }
// import React, { ReactNode } from "react";

// export default function Container({ children }: { children: ReactNode }) {
//   return (
//     <div className="px-3 mx-auto max-w-[480px] md:max-w-[768px] lg:max-w-[1400px]">
//       {children}
//     </div>
//   );
// }
import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className="px-3 mx-auto 
      min-[1400px]:max-w-[1320px] 
      min-[1200px]:max-w-[1140px] 
      min-[992px]:max-w-[960px] 
      min-[768px]:max-w-[720px] 
      min-[576px]:max-w-[540px] 
      w-full"
    >
      {children}
    </div>
  );
}
