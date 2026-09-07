"use client";

import { useState, useEffect } from "react";
import { Button, Card } from "@heroui/react";
import { Input } from "@heroui/input";
import { Save } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({
    site_title: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    stat_alliances: '',
    stat_uptime: '',
    stat_sla: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    // Implement fetch
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Implement save
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-headline uppercase tracking-tight text-primary">System Configuration</h1>
        <Button className="bg-primary text-white" onPress={handleSave} >
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-background border border-separator p-6 space-y-6">
          <h2 className="text-lg font-bold font-headline border-b border-separator pb-2">Global Settings</h2>

          <Input
            label="Site Title"
            value={settings.site_title}
            onChange={(e) => setSettings({...settings, site_title: e.target.value})}
            placeholder="Tr3-G Innovations Limited"
          />

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-foreground/60">Contact Information</h3>
            <Input
              label="Contact Email"
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
              placeholder="info@tr3-g.com.ng"
            />
            <Input
              label="Contact Phone"
              value={settings.contact_phone}
              onChange={(e) => setSettings({...settings, contact_phone: e.target.value})}
              placeholder="+234 704 8802 9218"
            />
            <Input
              label="HQ Address"
              value={settings.address}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
              placeholder="Abuja, Nigeria"
            />
          </div>
        </Card>

        <Card className="bg-background border border-separator p-6 space-y-6">
          <h2 className="text-lg font-bold font-headline border-b border-separator pb-2">Homepage Stats</h2>
          <div className="space-y-4">
            <Input
              label="Strategic Alliances (e.g. '11+')"
              value={settings.stat_alliances}
              onChange={(e) => setSettings({...settings, stat_alliances: e.target.value})}
            />
            <Input
              label="Platform Uptime (e.g. '99.9%')"
              value={settings.stat_uptime}
              onChange={(e) => setSettings({...settings, stat_uptime: e.target.value})}
            />
            <Input
              label="Enterprise SLA (e.g. '24/7')"
              value={settings.stat_sla}
              onChange={(e) => setSettings({...settings, stat_sla: e.target.value})}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-separator">
             <h2 className="text-lg font-bold font-headline text-danger mb-4">Security</h2>
             <Button className="bg-danger text-white w-full">
                Rotate Admin Password
             </Button>
             <p className="text-xs text-foreground/50 font-mono mt-2 text-center">
                Requires current password validation.
             </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
