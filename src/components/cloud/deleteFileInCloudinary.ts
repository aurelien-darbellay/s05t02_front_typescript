import axios from '../../axiosConfig';
import { ApiPaths } from '../../apiPaths';

export async function deleteFileInCloudinary(publicId: string) {
  await axios.post(ApiPaths.CLOUD_DELETE_PATH, {
    publicId,
  });
}
