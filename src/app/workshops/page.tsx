import React from 'react'; 
import { Button } from "@/components/ui/button";

const WorkShops = () => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        professorID: '',
        startDate: '',
        endDate: '',
        status: '',
        createdAt: '',
        updatedAt: ''
    }); 
    
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
}; 

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Workshop cadastrado:', formData);
}; 

return (
    <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Cadastro de WorkShops</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div> 
                <Label htmlFor="id">ID</Label>
                <Input type="text" id="id" name="id" value={formData.id} onChange={handleChange} className="mt-1 block w-full" />
            </div> 
            <div>
                <Label htmlFor="title">Título</Label>
                <Input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <div>
                <Label htmlFor="description">Descrição</Label>
                <Input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <div>
                <Label htmlFor="professorID">Professor ID</Label>
                <Input type="text" id="professorID" name="professorID" value={formData.professorID} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <div>
                <Label htmlFor="startDate">Data de Início</Label>
                <Input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <div>
                <Label htmlFor="endDate">Data de Término</Label>
                <Input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <div>
                <Label htmlFor="status">Status</Label>
                <Input type="text" id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <div>
                <Label htmlFor="createdAt">Criado em</Label>
                <Input type="date" id="createdAt" name="createdAt" value={formData.createdAt} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <div>
                <Label htmlFor="updatedAt">Atualizado em</Label>
                <Input type="date" id="updatedAt" name="updatedAt" value={formData.updatedAt} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Cadastrar Workshop</Button>
            </form>
            </div>
            );
        };

export default WorkShops