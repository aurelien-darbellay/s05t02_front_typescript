import { useTestDialogFromQuery } from './testDialog/useTestDialogFromQuery.js';
import TestDialog from './testDialog/TestDialog';

const Home = () => {
  const { open, closeDialog } = useTestDialogFromQuery();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full  bg-white shadow-lg p-8 text-center">
        <h1 className="main-header">cvFlows</h1>
        <h3 className="text-xl text-gray-800">
          Create, modify and distribute your curriculum vitae in a graph-like
          dynamic interface
        </h3>
      </div>
      <TestDialog open={open} onClose={closeDialog} />
    </div>
  );
};

export default Home;
