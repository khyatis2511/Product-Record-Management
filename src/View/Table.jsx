/* eslint-disable react/prop-types */
const Table = ({ cols, data }) => (
  <table>
    <thead>
      <tr>
        {cols.map((headerItem) => (
          <th key={headerItem.key}>{headerItem.title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {cols.map((col) => (
            <td>{col.render(item)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
