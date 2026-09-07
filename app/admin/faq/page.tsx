"use client";

import { useState, useEffect } from "react";
import { Button, Card, Modal, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useDisclosure } from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<any>({ question: '', answer: '', order: 0 });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    // Implement fetch
  };

  const handleSave = async () => {
    // Implement save
    onOpenChange();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-headline uppercase tracking-tight text-primary">Manage FAQ</h1>
        <Button className="bg-primary text-white" onPress={() => { setIsEditing(false); setCurrentFaq({ question: '', answer: '', order: 0 }); onOpen(); }}>
          Add FAQ
        </Button>
      </div>

      <Card className="bg-background border border-separator p-6">
        <div className="w-full">
           <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-separator">
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60 w-1/3">Question</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Answer</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60 w-16">Order</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b border-separator/50 last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{faq.question}</td>
                  <td className="py-3 px-4 text-sm max-w-sm truncate">{faq.answer}</td>
                  <td className="py-3 px-4 text-sm">{faq.order}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button isIconOnly size="sm" onPress={() => { setIsEditing(true); setCurrentFaq(faq); onOpen(); }}><Edit size={16} /></Button>
                      <Button isIconOnly size="sm" className="bg-danger text-white"><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                 <tr>
                  <td colSpan={4} className="py-8 text-center text-foreground/50 font-mono text-sm">
                    No FAQs found.
                  </td>
                 </tr>
              )}
            </tbody>
           </table>
        </div>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalHeader className="flex flex-col gap-1">{isEditing ? 'Edit FAQ' : 'Add FAQ'}</ModalHeader>
        <ModalBody>
          <Input
            label="Question"
            value={currentFaq.question}
            onChange={(e) => setCurrentFaq({...currentFaq, question: e.target.value})}
          />
          <Textarea
            label="Answer"
            value={currentFaq.answer}
            onChange={(e) => setCurrentFaq({...currentFaq, answer: e.target.value})}
            minRows={4}
          />
          <Input
            type="number"
            label="Order"
            value={currentFaq.order.toString()}
            onChange={(e) => setCurrentFaq({...currentFaq, order: parseInt(e.target.value)})}
            className="w-1/3"
          />
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
