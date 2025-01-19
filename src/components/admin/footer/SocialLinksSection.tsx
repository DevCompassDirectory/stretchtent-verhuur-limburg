import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import type { FooterSocialLink } from "@/hooks/use-footer-content";

interface SocialLinksSectionProps {
  socialLinks: FooterSocialLink[];
  onSocialLinksChange: (links: FooterSocialLink[]) => void;
}

export const SocialLinksSection = ({ socialLinks, onSocialLinksChange }: SocialLinksSectionProps) => {
  const addSocialLink = () => {
    onSocialLinksChange([
      ...socialLinks,
      {
        id: `new-${Date.now()}`,
        icon_type: "facebook",
        custom_svg: null,
        url: "",
        display_order: socialLinks.length,
      },
    ]);
  };

  const removeSocialLink = (index: number) => {
    onSocialLinksChange(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, updates: Partial<FooterSocialLink>) => {
    onSocialLinksChange(
      socialLinks.map((link, i) =>
        i === index ? { ...link, ...updates } : link
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Social Media Links</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSocialLink}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Link
        </Button>
      </div>

      <div className="space-y-4">
        {socialLinks.map((link, index) => (
          <div key={link.id} className="flex items-center gap-4">
            <select
              value={link.icon_type}
              onChange={(e) =>
                updateSocialLink(index, {
                  icon_type: e.target.value as FooterSocialLink["icon_type"],
                })
              }
              className="h-10 rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
              <option value="custom">Custom</option>
            </select>

            {link.icon_type === "custom" && (
              <Input
                value={link.custom_svg || ""}
                onChange={(e) =>
                  updateSocialLink(index, {
                    custom_svg: e.target.value,
                  })
                }
                placeholder="Paste SVG code here"
                className="flex-1"
              />
            )}

            <Input
              value={link.url}
              onChange={(e) =>
                updateSocialLink(index, { url: e.target.value })
              }
              placeholder="URL"
              className="flex-1"
            />

            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeSocialLink(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};