import { css } from '@emotion/react';
import { FC } from 'react';

import { ApiRequestData, ItemType, RequestColors } from '../token.ts';
const RequestDisplay: FC<{ request: ApiRequestData; name: string }> = ({ request, name }) => {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <span
        css={css`
          margin-right: 8px;
          color: ${RequestColors[request.method]};
        `}
      >
        {request.method}
      </span>
      <span>{name}</span>
    </div>
  );
};
const FolderDisplay: FC<{ name: string }> = ({ name }) => {
  return <div>{name}</div>;
};

// itemType key
const RequestItemDisplay: FC<{
  itemType: ItemType;
  request: ApiRequestData | undefined;
  name: string;
}> = ({ itemType, request, name }) => {
  return (
    <div>
      {itemType === ItemType.REQUEST && request && <RequestDisplay name={name} request={request} />}
      {itemType === ItemType.FOLDER && <FolderDisplay name={name} />}
    </div>
  );
};
export default RequestItemDisplay;
