import { ApiPaths } from '../../apiPaths';
import axios from '../../axiosConfig';
import { ActionButton } from '../../utils/ActionButton';

const CloudinaryDeleteButton = ({ publicId, size = 1 }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.post(ApiPaths.CLOUD_DELETE_PATH, {
        publicId,
      });
    } catch (e) {}
  };

  return (
    <ActionButton
      onClick={handleDelete}
      value={'Delete'}
      color="red"
      size={0.8 * size}
    />
  );
};

export default CloudinaryDeleteButton;
