"use client";

import { useState, useEffect } from "react";
import { Card, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useDisclosure } from "@heroui/modal";
import { Eye, Trash2, Mail } from "lucide-react";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentView, setCurrentView] = useState<any>(null);
  const [viewType, setViewType] = useState<string>('');

  useEffect(() => {
    // Implement fetch for all 3 types
  }, []);

  const openView = (type: string, item: any) => {
    setViewType(type);
    setCurrentView(item);
    onOpen();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-headline uppercase tracking-tight text-primary">Inbound Communications</h1>
      </div>

      {/* Leads */}
      <div>
        <h2 className="text-xl font-bold mb-4 font-headline flex items-center gap-2 border-b border-separator pb-2">
          Project Leads
        </h2>
        <Card className="bg-background border border-separator p-4">
          {leads.length === 0 ? (
            <p className="text-foreground/50 text-sm font-mono text-center py-4">No project leads found.</p>
          ) : (
            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-separator">
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Date</th>
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Name</th>
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Type</th>
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((item) => (
                    <tr key={item.id} className="border-b border-separator/50">
                      <td className="py-2 px-4 text-sm font-mono">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4 text-sm">{item.projectType}</td>
                      <td className="py-2 px-4">
                         <div className="flex gap-2">
                          <Button isIconOnly size="sm" onPress={() => openView('lead', item)}><Eye size={16} /></Button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Job Apps */}
      <div>
        <h2 className="text-xl font-bold mb-4 font-headline flex items-center gap-2 border-b border-separator pb-2">
          Job Applications
        </h2>
        <Card className="bg-background border border-separator p-4">
           {apps.length === 0 ? (
            <p className="text-foreground/50 text-sm font-mono text-center py-4">No applications found.</p>
          ) : (
            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-separator">
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Date</th>
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Applicant</th>
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Job ID</th>
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((item) => (
                    <tr key={item.id} className="border-b border-separator/50">
                      <td className="py-2 px-4 text-sm font-mono">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4 text-sm">{item.jobId}</td>
                      <td className="py-2 px-4">
                         <div className="flex gap-2">
                          <Button isIconOnly size="sm" onPress={() => openView('app', item)}><Eye size={16} /></Button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

       {/* Contact Messages */}
       <div>
        <h2 className="text-xl font-bold mb-4 font-headline flex items-center gap-2 border-b border-separator pb-2">
          Contact Messages
        </h2>
        <Card className="bg-background border border-separator p-4">
           {messages.length === 0 ? (
            <p className="text-foreground/50 text-sm font-mono text-center py-4">No messages found.</p>
          ) : (
            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-separator">
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Date</th>
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Sender</th>
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Subject</th>
                    <th className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((item) => (
                    <tr key={item.id} className="border-b border-separator/50">
                      <td className="py-2 px-4 text-sm font-mono">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4 text-sm">{item.subject || '-'}</td>
                      <td className="py-2 px-4">
                         <div className="flex gap-2">
                          <Button isIconOnly size="sm" onPress={() => openView('message', item)}><Eye size={16} /></Button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalHeader className="flex flex-col gap-1 uppercase tracking-wider text-primary">
          View {viewType}
        </ModalHeader>
        <ModalBody>
          {currentView && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 border-b border-separator pb-4">
                <div>
                  <p className="text-xs text-foreground/60 uppercase font-bold">Name</p>
                  <p className="font-medium">{currentView.name}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase font-bold">Email</p>
                  <a href={`mailto:${currentView.email}`} className="font-medium text-primary hover:underline flex items-center gap-1">
                    <Mail size={12}/> {currentView.email}
                  </a>
                </div>
              </div>

              {viewType === 'lead' && (
                <div className="grid grid-cols-2 gap-4 border-b border-separator pb-4">
                   <div>
                    <p className="text-xs text-foreground/60 uppercase font-bold">Type</p>
                    <p className="text-sm font-mono">{currentView.projectType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 uppercase font-bold">Budget</p>
                    <p className="text-sm font-mono">{currentView.budgetRange || 'Unspecified'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 uppercase font-bold">Timeline</p>
                    <p className="text-sm font-mono">{currentView.timeline || 'Unspecified'}</p>
                  </div>
                </div>
              )}

              {viewType === 'message' && currentView.subject && (
                 <div className="border-b border-separator pb-4">
                  <p className="text-xs text-foreground/60 uppercase font-bold">Subject</p>
                  <p className="font-medium">{currentView.subject}</p>
                 </div>
              )}

              <div>
                <p className="text-xs text-foreground/60 uppercase font-bold mb-2">
                  {viewType === 'app' ? 'Resume / Cover Letter' : 'Details'}
                </p>
                <div className="bg-surface p-4 rounded text-sm whitespace-pre-wrap font-mono">
                  {currentView.description || currentView.message || currentView.resumeText}
                </div>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onPress={onOpenChange}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
