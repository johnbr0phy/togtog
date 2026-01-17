'use client';

import { ContentBlock, JourneyProgressData } from '@/types/journey';
import {
  TextBlock,
  QuizBlock,
  VideoBlock,
  TipBlock,
  ChecklistBlock,
  QuoteBlock,
  ExerciseBlock,
} from './blocks';

interface StepRendererProps {
  blocks: ContentBlock[];
  moduleId: string;
  stepId: string;
  progress: JourneyProgressData;
  onQuizAnswer?: (blockId: string, optionId: string, isCorrect: boolean) => void;
  onChecklistProgress?: (blockId: string, checkedIds: string[]) => void;
  onExerciseSave?: (blockId: string, text: string) => void;
}

export default function StepRenderer({
  blocks,
  moduleId,
  stepId,
  progress,
  onQuizAnswer,
  onChecklistProgress,
  onExerciseSave,
}: StepRendererProps) {
  const moduleProgress = progress.moduleProgress?.[moduleId];

  return (
    <div className="step-content space-y-2">
      {blocks.map((block) => {
        switch (block.type) {
          case 'text':
            return <TextBlock key={block.id} content={block.content} />;

          case 'video':
            return <VideoBlock key={block.id} content={block.content} />;

          case 'quiz':
            return (
              <QuizBlock
                key={block.id}
                blockId={block.id}
                content={block.content}
                savedAnswer={moduleProgress?.quizAnswers?.[`${stepId}-${block.id}`]}
                onAnswer={(optionId, isCorrect) =>
                  onQuizAnswer?.(block.id, optionId, isCorrect)
                }
              />
            );

          case 'checklist':
            return (
              <ChecklistBlock
                key={block.id}
                blockId={block.id}
                content={block.content}
                savedProgress={moduleProgress?.checklistProgress?.[block.id]}
                onProgress={(checkedIds) =>
                  onChecklistProgress?.(block.id, checkedIds)
                }
              />
            );

          case 'tip':
            return <TipBlock key={block.id} content={block.content} />;

          case 'quote':
            return <QuoteBlock key={block.id} content={block.content} />;

          case 'exercise':
            return (
              <ExerciseBlock
                key={block.id}
                blockId={block.id}
                content={block.content}
                savedResponse={moduleProgress?.exerciseResponses?.[block.id]}
                onSave={(text) => onExerciseSave?.(block.id, text)}
              />
            );

          default:
            // Handle unknown block types gracefully
            return (
              <div
                key={block.id}
                className="p-4 bg-gray-100 rounded-lg text-gray-500 text-sm"
              >
                Unknown content type: {(block as ContentBlock).type}
              </div>
            );
        }
      })}
    </div>
  );
}
