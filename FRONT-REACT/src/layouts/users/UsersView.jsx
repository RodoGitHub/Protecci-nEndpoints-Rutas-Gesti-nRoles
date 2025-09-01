import { useUserContext } from '../../context/UserContext';
import { useAuthContext } from '../../context/AuthContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   

export default function UsersView() {
  const { users, deleteUser, loading, error } = useUserContext();
  const { user } = useAuthContext();
  const isAdmin = user?.rol === 'admin'; 

  const handleExport = () => {
    exportToPDF(users, 'Usuarios', ['nombre', 'contrasenia', 'email', 'edad']);
  };

  return (
    <div>
      <h2>👤 Lista de Usuarios 👤</h2>
      {isAdmin && (
      <Link to="/usuarios/crear">
        <Button label="Crear nuevo usuario" icon="pi pi-plus" className="p-button-rounded p-button-success" />
      </Link>
      )}
      <Link to="/">
        <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
      </Link>
      <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataTable value={Array.isArray(users) ? users : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
        <Column field="nombre" header="Nombre" />
        <Column field="email" header="Email" />
        <Column field="contrasenia" header="Contraseña" body={(rowData) => (<span> {'•'.repeat(rowData?.contrasenia?.length)} </span>)}/>
        <Column field="edad" header="Edad" />
        <Column field="rol" header="Rol" />
        {isAdmin && (
          <Column 
            header="Acciones" 
            body={(rowData) => (
              <>
                <Link to={`/usuarios/editar/${rowData.id}`}>
                  <Button label="Editar" icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
                </Link>
                <Button 
                  label="Eliminar" 
                  icon="pi pi-trash" 
                  className="p-button-rounded p-button-danger" 
                  onClick={() => deleteUser(rowData.id)} 
                />
              </>
            )}
          />
        )}
      </DataTable>
      <h5>(sin darme cuenta hice el campo contraseña de más)</h5>
    </div>
  );
}
