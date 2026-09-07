"use client";

import { useState, useEffect } from "react";
import { Button, Card, Modal, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useDisclosure } from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminCareers() {
  const [jobs, setJobs] = useState<any[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState<any>({ title: '', department: '', location: '', description: '', isOpen: true });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    // Implement fetch
  };

  const handleSave = async () => {
    // Implement save
    onOpenChange();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-headline uppercase tracking-tight text-primary">Manage Careers</h1>
        <Button className="bg-primary text-white" onPress={() => { setIsEditing(false); setCurrentJob({ title: '', department: '', location: '', description: '', isOpen: true }); onOpen(); }}>
          Add Requisition
        </Button>
      </div>

      <Card className="bg-background border border-separator p-6">
        <div className="w-full">
           <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-separator">
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Title</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Department</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Location</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Status</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-separator/50 last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{job.title}</td>
                  <td className="py-3 px-4 text-sm">{job.department}</td>
                  <td className="py-3 px-4 text-sm">{job.location}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${job.isOpen ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                      {job.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button isIconOnly size="sm" onPress={() => { setIsEditing(true); setCurrentJob(job); onOpen(); }}><Edit size={16} /></Button>
                      <Button isIconOnly size="sm" className="bg-danger text-white"><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                 <tr>
                  <td colSpan={5} className="py-8 text-center text-foreground/50 font-mono text-sm">
                    No career requisitions found.
                  </td>
                 </tr>
              )}
            </tbody>
           </table>
        </div>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalHeader className="flex flex-col gap-1">{isEditing ? 'Edit Requisition' : 'Add Requisition'}</ModalHeader>
        <ModalBody>
          <Input
            label="Job Title"
            value={currentJob.title}
            onChange={(e) => setCurrentJob({...currentJob, title: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Department"
              value={currentJob.department}
              onChange={(e) => setCurrentJob({...currentJob, department: e.target.value})}
            />
            <Input
              label="Location"
              value={currentJob.location}
              onChange={(e) => setCurrentJob({...currentJob, location: e.target.value})}
            />
          </div>
          <Textarea
            label="Description"
            value={currentJob.description}
            onChange={(e) => setCurrentJob({...currentJob, description: e.target.value})}
            minRows={5}
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="isOpen"
              checked={currentJob.isOpen}
              onChange={(e) => setCurrentJob({...currentJob, isOpen: e.target.checked})}
              className="w-4 h-4 text-primary"
            />
            <label htmlFor="isOpen" className="text-sm font-medium">Accepting Applications</label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="bg-danger text-white" onPress={onOpenChange}>
            Cancel
          </Button>
          <Button className="bg-primary text-white" onPress={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
