import { parseEmojiPoint, parsePoint } from "@/utils/summary-helpers";
import { MotionDiv } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const EmojiPoint = ({ point }: { point: string }) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {};
  return (
    <div className="flex items-start gap-3 mb-3">
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <span className="text-gray-700 leading-relaxed">{text}</span>
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <div className="mb-3">
      <span className="text-gray-700 leading-relaxed">{point}</span>
    </div>
  );
};

export default function ContentSection({
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <MotionDiv
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);

        if (isEmpty) {
          return null;
        }

        if (hasEmoji || isMainPoint) {
          return (
            <MotionDiv key={index} variants={itemVariants}>
              <EmojiPoint point={point} />
            </MotionDiv>
          );
        }

        return (
          <MotionDiv key={index} variants={itemVariants}>
            <RegularPoint point={point} />
          </MotionDiv>
        );
      })}
    </MotionDiv>
  );
}
