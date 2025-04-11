import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  padding: 3rem;
  border-radius: 12px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: block;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    outline: none;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  p {
    color: #718096;
    font-size: 0.95rem;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
    color: #4a5568;
  }

  p {
    color: #718096;
  }
`;

const ResponseCard = styled(Card)`
  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-top: 1rem;
  }

  h3 {
    color: #4a5568;
    margin-bottom: 1rem;
  }
`;

const CodeSection = styled.div`
  margin-top: 2rem;
`;

const FileTab = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#6366f1' : '#e2e8f0'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border: none;
  border-radius: 6px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#6366f1' : '#cbd5e0'};
  }
`;

const DownloadButton = styled(Button)`
  background: #10b981;
  margin-top: 1rem;

  &:hover {
    background: #059669;
  }
`;

const CodePreview = styled.pre`
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 1rem;
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
`;

const PreviewCard = styled(Card)`
  margin-top: 2rem;
`;

const PreviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background-color: #f7fafc;
    font-weight: 600;
  }
`;

const PreviewForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    
    &:hover {
      background-color: #4f46e5;
    }
  }
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 0.5rem;
  
  &.edit {
    background-color: #3b82f6;
    color: white;
    
    &:hover {
      background-color: #2563eb;
    }
  }
  
  &.delete {
    background-color: #ef4444;
    color: white;
    
    &:hover {
      background-color: #dc2626;
    }
  }
`;

const PreviewSection = styled.div`
  margin-top: 2rem;
`;

function CrudPreview() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/crud/data');
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await fetch(`http://localhost:5000/api/crud/data/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          setItems(items.map(item => 
            item.id === editingId ? data.item : item
          ));
          setEditingId(null);
        }
      } else {
        const res = await fetch('http://localhost:5000/api/crud/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          setItems([...items, data.item]);
        }
      }
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/crud/data/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <PreviewCard>
      <h3>Live Preview</h3>
      <PreviewForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? 'Update' : 'Add'} Item
        </button>
      </PreviewForm>

      <PreviewTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <ActionButton
                  className="edit"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </ActionButton>
                <ActionButton
                  className="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </PreviewTable>
    </PreviewCard>
  );
}

function App() {
  const [formData, setFormData] = useState({
    prompt: '',
    type: 'Web Application'
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [promptHistory, setPromptHistory] = useState([]);
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPromptHistory();
    // Fetch initial CRUD data
    fetch('http://localhost:5000/api/crud/data')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setItems(data.data);
        }
      })
      .catch(err => console.error('Error fetching items:', err));
  }, []);

  const fetchPromptHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/history');
      const data = await res.json();
      if (data.success) {
        setPromptHistory(data.history);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setActiveFile(null);

    try {
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          type: formData.type
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate code');
      }

      setResponse(data);
      // Set the first file as active
      setActiveFile(Object.keys(data.files)[0]);
      // Fetch updated history after successful generation
      fetchPromptHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (response?.downloadPath) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = `http://localhost:5000${response.downloadPath}`;
      link.setAttribute('download', 'project.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/crud/data/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <Container>
      <Header>
        <Title>AI Coding Agent</Title>
        <Subtitle>
          Transform your ideas into working applications with the power of AI.
          Just describe what you want to build, and let our AI handle the coding.
        </Subtitle>
      </Header>

      <Card>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="prompt">Describe Your Application</Label>
            <TextArea
              id="prompt"
              placeholder="Example: Create a CRUD application for managing users with name, email, and phone fields..."
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="business">Business Website</option>
              <option value="portfolio">Portfolio Website</option>
              <option value="ecommerce">E-commerce Website</option>
              <option value="blog">Blog Website</option>
              <option value="restaurant">Restaurant Website</option>
              <option value="web">Web Application</option>
              <option value="mobile">Mobile Application</option>
              <option value="desktop">Desktop Application</option>
            </Select>
          </div>

          <Button type="submit" disabled={!formData.prompt || loading}>
            {loading ? 'Generating...' : 'Generate Application'}
          </Button>
        </Form>
      </Card>

      {error && (
        <ResponseCard>
          <h3>Error</h3>
          <p style={{ color: '#e53e3e' }}>{error}</p>
        </ResponseCard>
      )}

      {response && (
        <>
          <ResponseCard>
            <h3>Generated Code Files</h3>
            <div>
              {Object.keys(response.files).map((filename) => (
                <FileTab
                  key={filename}
                  active={activeFile === filename}
                  onClick={() => setActiveFile(filename)}
                >
                  {filename}
                </FileTab>
              ))}
            </div>
            
            {activeFile && (
              <CodeSection>
                <h4>{activeFile}</h4>
                <CodePreview>{response.files[activeFile]}</CodePreview>
              </CodeSection>
            )}

            <DownloadButton onClick={handleDownload}>
              Download Project Files
            </DownloadButton>
          </ResponseCard>

          {/* Dynamic Preview Section */}
          <PreviewCard>
            <h3>Live Preview</h3>
            {formData.prompt.toLowerCase().includes('crud') ? (
              <div style={{ padding: '1rem' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  padding: '2rem',
                  borderRadius: '1rem',
                  marginBottom: '2rem',
                  color: 'white'
                }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Manage Items</h2>
                  <p style={{ opacity: 0.9 }}>Add, edit, or remove items from your database.</p>
                </div>

                <PreviewForm onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const data = {
                    name: formData.get('name'),
                    email: formData.get('email')
                  };

                  // Handle both create and update
                  const url = editingId 
                    ? `http://localhost:5000/api/crud/data/${editingId}`
                    : 'http://localhost:5000/api/crud/data';
                  
                  const method = editingId ? 'PUT' : 'POST';

                  fetch(url, {
                    method: method,
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  })
                  .then(res => res.json())
                  .then(result => {
                    if (result.success) {
                      // Clear form and editingId
                      e.target.reset();
                      setEditingId(null);
                      // Refresh data
                      fetch('http://localhost:5000/api/crud/data')
                        .then(res => res.json())
                        .then(data => {
                          if (data.success) {
                            setItems(data.data);
                          }
                        });
                    }
                  })
                  .catch(err => console.error('Error:', err));
                }} style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  marginBottom: '2rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-end'
                }}>
                  <div style={{ flex: '1' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      color: '#4B5563',
                      fontWeight: '500'
                    }}>Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Enter name"
                      required
                      defaultValue={editingId ? items.find(item => item.id === editingId)?.name : ''}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        border: '2px solid #E5E7EB',
                        outline: 'none',
                        transition: 'all 0.2s',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div style={{ flex: '1' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      color: '#4B5563',
                      fontWeight: '500'
                    }}>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Enter email"
                      required
                      defaultValue={editingId ? items.find(item => item.id === editingId)?.email : ''}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        border: '2px solid #E5E7EB',
                        outline: 'none',
                        transition: 'all 0.2s',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <button 
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600',
                      height: '45px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s'
                    }}
                  >
                    {editingId ? 'Update Item' : 'Add Item'}
                  </button>
                  {editingId && (
                    <button 
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        // Reset form
                        const form = document.querySelector('form');
                        if (form) form.reset();
                      }}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        height: '45px',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s'
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </PreviewForm>

                <div style={{
                  background: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden'
                }}>
                  <PreviewTable>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>
                            <ActionButton 
                              className="edit"
                              onClick={() => handleEdit(item)}
                              style={{
                                background: '#3b82f6',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.375rem',
                                marginRight: '0.5rem',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              Edit
                            </ActionButton>
                            <ActionButton 
                              className="delete"
                              onClick={() => handleDelete(item.id)}
                              style={{
                                background: '#ef4444',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.375rem',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              Delete
                            </ActionButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </PreviewTable>
                </div>
              </div>
            ) : response.files['index.html'] ? (
              // Static Website Preview with enhanced styling
              <div style={{ position: 'relative' }}>
                <iframe
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Live Preview</title>
                        
                        <!-- Bootstrap 5 CSS -->
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                        
                        <!-- Font Awesome 6 -->
                        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
                        
                        <!-- Google Fonts -->
                        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
                        
                        <!-- Animate On Scroll -->
                        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
                        
                        <style>
                          body { 
                            font-family: 'Inter', sans-serif;
                            overflow-x: hidden;
                          }
                          .btn-primary {
                            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                            border: none;
                            transition: all 0.3s ease;
                          }
                          .btn-primary:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
                          }
                        </style>
                        
                        ${response.files['styles.css'] ? `<style>${response.files['styles.css']}</style>` : ''}
                        ${response.files['assets/css/custom.css'] ? `<style>${response.files['assets/css/custom.css']}</style>` : ''}
                      </head>
                      <body>
                        ${response.files['index.html']}
                        
                        <!-- Bootstrap 5 JS Bundle -->
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                        
                        <!-- jQuery (for compatibility) -->
                        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                        
                        <!-- Animate On Scroll -->
                        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
                        
                        <!-- Custom Scripts -->
                        ${response.files['script.js'] ? `<script>${response.files['script.js']}</script>` : ''}
                        ${response.files['assets/js/main.js'] ? `<script>${response.files['assets/js/main.js']}</script>` : ''}
                        
                        <script>
                          // Initialize AOS
                          AOS.init();
                          
                          // Initialize Bootstrap tooltips and popovers
                          var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                          var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                            return new bootstrap.Tooltip(tooltipTriggerEl)
                          })
                          
                          var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
                          var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
                            return new bootstrap.Popover(popoverTriggerEl)
                          })
                        </script>
                      </body>
                    </html>
                  `}
                  style={{
                    width: '100%',
                    height: '800px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  title="Live Preview"
                />
              </div>
            ) : (
              // Default message for other types
              <p style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
                Preview not available for this type of application.
                Please download the project files to run it locally.
              </p>
            )}
          </PreviewCard>
        </>
      )}

      {promptHistory.length > 0 && (
        <Card style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#4a5568', marginBottom: '1rem' }}>Prompt History</h3>
          {promptHistory.map((item) => (
            <div
              key={item._id}
              style={{
                padding: '1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                marginBottom: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>{item.prompt}</p>
              <small style={{ color: '#718096' }}>
                {new Date(item.createdAt).toLocaleString()} - {item.type}
              </small>
            </div>
          ))}
        </Card>
      )}

      {!response && !error && (
        <FeatureGrid>
          <FeatureCard>
            <h3>Complete CRUD Applications</h3>
            <p>Generate full-stack CRUD applications with frontend forms, backend API, and database integration.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Ready to Run</h3>
            <p>Get fully functional code that you can run immediately with proper setup and dependencies.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Best Practices</h3>
            <p>Generated code follows modern development practices with proper error handling and validation.</p>
          </FeatureCard>
        </FeatureGrid>
      )}

      {loading && (
        <LoadingOverlay>
          <LoadingContent>
            <h3>Generating Your Application</h3>
            <p>Please wait while our AI creates your Web application...</p>
          </LoadingContent>
        </LoadingOverlay>
      )}
    </Container>
  );
}

export default App; 