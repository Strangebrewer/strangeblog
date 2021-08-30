function Hotkey(options) {
  const { type, key, node } = options;
  return {
    onKeyDown(event, editor, next) {
      if (!event.ctrlKey || event.key !== key) return next();
      event.preventDefault();
      if (node) {
        const isCode = editor.value.blocks.some(block => block.type === type);
        editor.setBlocks(isCode ? 'paragraph' : type);
      }
      editor.toggleMark(type);
    }
  }
};

const plugins = [
  Hotkey({ key: 'b', type: 'bold' }),
  Hotkey({ key: 'i', type: 'italic' }),
  Hotkey({ key: 'q', type: 'strikethrough' }),
  Hotkey({ key: 'u', type: 'underline' }),
];

export { plugins };
