'use client';

import { VideoContent } from '@/types/journey';

interface VideoBlockProps {
  content: VideoContent;
}

export default function VideoBlock({ content }: VideoBlockProps) {
  return (
    <div className="video-block my-6">
      {/* Title */}
      {content.title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">{content.title}</h3>
          {content.duration && <span className="text-sm text-gray-500">{content.duration}</span>}
        </div>
      )}

      {/* Video embed */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-900">
        <iframe
          src={`https://www.youtube.com/embed/${content.youtubeId}?rel=0&modestbranding=1`}
          title={content.title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
