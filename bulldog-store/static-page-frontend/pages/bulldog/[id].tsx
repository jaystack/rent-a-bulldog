import React from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

import DataRender from '../../src/components/DataRenderer';
import { BulldogFields } from '../../types';
import { getBulldogById, getBulldogs } from '../../api'

type BulldogType = {
  fields: {
    id: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allBulldogData = await getBulldogs()
  const paths = allBulldogData.map((bulldog: BulldogType) => ({
    params: { id: bulldog.fields.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bulldogData = await getBulldogById(params?.id as string);
  return {
    props: {
      bulldogData: bulldogData || {
        field: {}
      },
    },
    revalidate: 15,
  };
};

type BulldogProps = {
  bulldogData: BulldogFields;
};

const Bulldog = ({ bulldogData }: BulldogProps) => {
  const { name, image, description, id } = bulldogData?.fields;
  return (
    <>
      <h2>
        {name}
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={image?.fields?.file?.url} style={{ maxWidth: '100%', height: 500, objectFit: 'cover' }} />
      </div>
      <DataRender document={description} />
      <Link href='/bulldogs'>
        <a>Back to bulldogs</a>
      </Link>
    </>
  );
};

export default Bulldog;
