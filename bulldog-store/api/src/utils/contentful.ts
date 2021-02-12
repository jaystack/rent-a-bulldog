// tslint:disable-next-line: no-var-requires
const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

const getContent = async (
  contentType: string,
  id?: string,
) => {
  const entries = await client.getEntries({
    content_type: contentType,
    ...(id && { 'fields.id[in]': id }),
  });

  console.log(entries);
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${contentType}.`);
};


export default getContent;