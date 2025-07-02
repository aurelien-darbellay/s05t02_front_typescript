interface UnprojectedEntriesShelfProps {
  docData: any;
}

export const UnprojectedEntriesShelf: React.FC<
  UnprojectedEntriesShelfProps
> = ({ docData }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      {/* For now, just show the JSON as a placeholder */}
      <pre>{JSON.stringify(docData, null, 2)}</pre>
    </div>
  );
};
