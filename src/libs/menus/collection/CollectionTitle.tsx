import { ItemType, RequestMethods } from '../../token.ts';
import RequestItemDisplay from '../../widgets/RequestItemDisplay.tsx';

function CollectionTitle({data}) {
  console.log(data, 'data')
  const item = data
  return (
    <div>
      <RequestItemDisplay
        itemType={item.request ? ItemType.REQUEST : ItemType.FOLDER}
        name={item.name}
        request={{
          method: item.request?.method || RequestMethods.PATCH,
          header: item.request?.header,
        }}
      />
    </div>
  );
}

export default CollectionTitle;
