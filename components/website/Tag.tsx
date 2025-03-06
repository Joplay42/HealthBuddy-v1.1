// Props import
import { tagProps } from "@/types";
// NextJs Image import
import Image from "next/image";

/**
 * This custom tag component is used to highlight certain keyword. You can custom
 * the tex and it return a stylish tag component
 *
 * @param text the text to display
 * @returns
 */
const Tag = ({ text }: tagProps) => {
  return (
    // Container
    <div className="tagElement">
      {/** Icon */}
      <Image src="/arrow-up-right.svg" height={20} width={20} alt="Icon tag" />
      {/** The text to display */}
      <p>{text}</p>
    </div>
  );
};

export default Tag;
