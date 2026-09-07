"use client";

import { useState, useEffect } from "react";
import { Button, Card, Modal, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useDisclosure } from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";
import Image from "next/image";

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>({ title: '', body: '', imageBase64: '', author: '', tags: '', published: false });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // Implement fetch
  };

  const handleSave = async () => {
    // Implement save
    onOpenChange();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-headline uppercase tracking-tight text-primary">Manage Blog Posts</h1>
        <Button className="bg-primary text-white" onPress={() => { setIsEditing(false); setCurrentPost({ title: '', body: '', imageBase64: '', author: '', tags: '', published: false }); onOpen(); }}>
          Add Post
        </Button>
      </div>

      <Card className="bg-background border border-separator p-6">
        <div className="w-full">
           <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-separator">
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Image</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Title</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Author</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Status</th>
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-foreground/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-separator/50 last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-4">
                    {post.imageBase64 ? (
                      <div className="relative w-16 h-12 rounded overflow-hidden">
                        <Image src={post.imageBase64} alt={post.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-12 bg-surface flex items-center justify-center text-[10px] text-foreground/50 rounded font-mono border border-separator border-dashed">NO IMG</div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium max-w-[200px] truncate">{post.title}</td>
                  <td className="py-3 px-4 text-sm">{post.author}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${post.published ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button isIconOnly size="sm" onPress={() => { setIsEditing(true); setCurrentPost(post); onOpen(); }}><Edit size={16} /></Button>
                      <Button isIconOnly size="sm" className="bg-danger text-white"><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                 <tr>
                  <td colSpan={5} className="py-8 text-center text-foreground/50 font-mono text-sm">
                    No blog posts found.
                  </td>
                 </tr>
              )}
            </tbody>
           </table>
        </div>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalHeader className="flex flex-col gap-1">{isEditing ? 'Edit Post' : 'Add Post'}</ModalHeader>
        <ModalBody>
          <Input
            label="Title"
            value={currentPost.title}
            onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
             <Input
              label="Author"
              value={currentPost.author}
              onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
            />
            <Input
              label="Tags (comma separated)"
              value={currentPost.tags}
              onChange={(e) => setCurrentPost({...currentPost, tags: e.target.value})}
            />
          </div>
          <Textarea
            label="Body (HTML/Markdown)"
            value={currentPost.body}
            onChange={(e) => setCurrentPost({...currentPost, body: e.target.value})}
            minRows={6}
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="published"
              checked={currentPost.published}
              onChange={(e) => setCurrentPost({...currentPost, published: e.target.checked})}
              className="w-4 h-4 text-primary"
            />
            <label htmlFor="published" className="text-sm font-medium">Publish Post</label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">Cover Image (Base64)</label>
            <ImageUpload
              value={currentPost.imageBase64}
              onChange={(base64) => setCurrentPost({...currentPost, imageBase64: base64})}
              maxSizeMB={2}
            />
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
