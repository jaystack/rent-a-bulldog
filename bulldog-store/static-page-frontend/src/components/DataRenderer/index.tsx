import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

type DataRendererProps = {
  document: Document;
};

const DataRenderer = ({ document }: DataRendererProps) => {
  return <>{documentToReactComponents(document)}</>;
};

export default DataRenderer;
