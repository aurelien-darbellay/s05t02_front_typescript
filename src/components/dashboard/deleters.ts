import axios from '../../axiosConfig';
import { ApiPaths } from '../../apiPaths';

export const createDeleteDocument = (onDelete: () => void) => {
  return async (docId: string) => {
    try {
      const url = ApiPaths.DELETE_DOC_PATH.replace('{docId}', docId);
      await axios.post(url, {});
      onDelete();
    } catch (err) {
      console.error('Failed to delete document', err);
    }
  };
};

export const createDeletePublicView = (onDelete: () => void) => {
  return async (pvId: string) => {
    try {
      const url = ApiPaths.PV_DELETE_PATH.replace('{pvId}', pvId);
      await axios.post(url, {});
      onDelete();
    } catch (err) {
      console.error('Failed to delete document', err);
    }
  };
};
