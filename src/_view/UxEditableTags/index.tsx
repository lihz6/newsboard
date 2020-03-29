import React, { useState, useRef, useEffect } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.scss';

export interface UxEditableTagsProps {
  eclipseThreshold?: number;
  tags?: string[];
  onChange?(newTags: string[]): void;
  addLabel: string;
}

export default function UxEditableTags({
  addLabel,
  tags = [],
  onChange,
  eclipseThreshold = 8,
}: UxEditableTagsProps) {
  const [{ inputVisible, inputValue }, setState] = useState({
    inputVisible: false,
    inputValue: '',
  });
  const input = useRef<Input>(null);
  useEffect(() => {
    if (inputVisible) {
      input.current!.focus();
    }
  }, [inputVisible]);
  const handleClose = removedTag => {
    onChange?.(tags.filter(tag => tag !== removedTag));
  };

  const showInput = () => {
    setState(state => ({ ...state, inputVisible: true }));
  };

  const handleInputChange = e => {
    setState({
      inputValue: e.target.value,
      inputVisible,
    });
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      debugger;
      onChange?.([...tags, inputValue]);
    }
    setState({
      inputVisible: false,
      inputValue: '',
    });
  };
  return (
    <div>
      {tags.map(tag => {
        const isLongTag = tag.length > eclipseThreshold;
        const tagElem = (
          <Tag key={tag} closable onClose={() => handleClose(tag)}>
            {isLongTag ? `${tag.slice(0, eclipseThreshold)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={input}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onPressEnter={handleInputConfirm}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="ux-editable-tags-plus" onClick={showInput}>
          <PlusOutlined /> {addLabel}
        </Tag>
      )}
    </div>
  );
}
