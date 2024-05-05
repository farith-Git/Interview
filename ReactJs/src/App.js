import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUpload from './components/ImageUpload';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ImageUpload />
    </div>
  );
}

export default App;
