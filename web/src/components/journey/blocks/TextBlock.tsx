'use client';

import { TextContent } from '@/types/journey';

interface TextBlockProps {
  content: TextContent;
}

export default function TextBlock({ content }: TextBlockProps) {
  // Simple markdown-like rendering
  // Supports: **bold**, *italic*, - bullet lists, numbered lists, ## headings
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag
            key={key++}
            className={listType === 'ul' ? 'list-disc pl-6 space-y-2 my-4' : 'list-decimal pl-6 space-y-2 my-4'}
          >
            {listItems.map((item, i) => (
              <li key={i} className="text-gray-700">
                {formatInlineText(item)}
              </li>
            ))}
          </ListTag>
        );
        listItems = [];
        listType = null;
      }
    };

    const formatInlineText = (text: string): React.ReactNode => {
      // Handle **bold** and *italic*
      const parts: React.ReactNode[] = [];
      let remaining = text;
      let partKey = 0;

      while (remaining.length > 0) {
        // Check for bold
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        // Check for italic (single asterisk not followed by another)
        const italicMatch = remaining.match(/\*([^*]+?)\*/);

        if (boldMatch && (!italicMatch || boldMatch.index! <= italicMatch.index!)) {
          const before = remaining.slice(0, boldMatch.index);
          if (before) parts.push(before);
          parts.push(
            <strong key={partKey++} className="font-semibold text-gray-900">
              {boldMatch[1]}
            </strong>
          );
          remaining = remaining.slice(boldMatch.index! + boldMatch[0].length);
        } else if (italicMatch) {
          const before = remaining.slice(0, italicMatch.index);
          if (before) parts.push(before);
          parts.push(
            <em key={partKey++} className="italic">
              {italicMatch[1]}
            </em>
          );
          remaining = remaining.slice(italicMatch.index! + italicMatch[0].length);
        } else {
          parts.push(remaining);
          break;
        }
      }

      return parts.length === 1 ? parts[0] : <>{parts}</>;
    };

    for (const line of lines) {
      const trimmed = line.trim();

      // Empty line - flush list and add spacing
      if (!trimmed) {
        flushList();
        continue;
      }

      // Heading ##
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={key++} className="text-xl font-bold text-gray-900 mt-6 mb-3">
            {formatInlineText(trimmed.slice(3))}
          </h2>
        );
        continue;
      }

      // Heading ###
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={key++} className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            {formatInlineText(trimmed.slice(4))}
          </h3>
        );
        continue;
      }

      // Unordered list item
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (listType === 'ol') flushList();
        listType = 'ul';
        listItems.push(trimmed.slice(2));
        continue;
      }

      // Ordered list item
      const orderedMatch = trimmed.match(/^\d+\.\s+(.+)/);
      if (orderedMatch) {
        if (listType === 'ul') flushList();
        listType = 'ol';
        listItems.push(orderedMatch[1]);
        continue;
      }

      // Regular paragraph
      flushList();
      elements.push(
        <p key={key++} className="text-gray-700 leading-relaxed my-3">
          {formatInlineText(trimmed)}
        </p>
      );
    }

    flushList();
    return elements;
  };

  return <div className="text-block">{renderMarkdown(content.markdown)}</div>;
}
