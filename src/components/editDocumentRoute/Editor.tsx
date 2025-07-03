import { ContainerEntry, Entry } from '../../model/EntriesGeneralFeatures';
import { TypesConfig } from '../../model/TypesConfig';
import { Canvas } from '../canvas/Canvas';
import { UnprojectedEntriesShelf } from './UnprojectedEntriesShelf';

interface EditorProps {
  docData: any;
  entries: ContainerEntry[];
  setEntries: React.Dispatch<React.SetStateAction<ContainerEntry[]>>;
  cfg: TypesConfig;
  setDocData: (updatedDoc: any) => void;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddEntry: (entryData: any, isEditing: boolean) => void;
  handleDeleteEntry: (entryData: Entry) => void;
}
const Editor: React.FC<EditorProps> = ({
  docData,
  entries,
  setEntries,
  cfg,
}) => {
  return (
    <div className="w-full flex">
      <div className="w-1/7">
        <UnprojectedEntriesShelf entries={entries} />
      </div>
      <div className="w-6/7 bg-gray-100">
        <Canvas
          docData={docData}
          entries={entries}
          setEntries={setEntries}
          cfg={cfg}
          setDocData={setUpdatedDocData}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          handleAddEntry={handleAddEntry}
          handleDeleteEntry={handleDeleteEntry}
        />
      </div>
      <UserUpdateDialog
        open={updateUser}
        message={updateUserMessage}
        onClick={closeUserUpdateDialog}
      />
    </div>
  );
};

export default Editor;
