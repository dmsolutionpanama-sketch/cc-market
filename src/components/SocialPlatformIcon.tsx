import React from 'react';
import { Platform } from '../types';

interface SocialPlatformIconProps {
  platform: Platform | string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  followers?: string;
  url?: string;
  className?: string;
}

export const getSocialPlatformMeta = (platform: string) => {
  const p = platform.trim();
  switch (p) {
    case 'Instagram':
      return {
        name: 'Instagram',
        badgeBg: 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white border-pink-500',
        textColor: 'text-pink-600',
        hoverBg: 'hover:bg-pink-600 hover:text-white',
        borderColor: 'border-pink-300',
        icon: (cls = "w-4 h-4") => (
          <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        )
      };
    case 'TikTok':
      return {
        name: 'TikTok',
        badgeBg: 'bg-slate-950 text-cyan-400 border-slate-700',
        textColor: 'text-slate-900',
        hoverBg: 'hover:bg-slate-900 hover:text-white',
        borderColor: 'border-slate-800',
        icon: (cls = "w-4 h-4") => (
          <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.2a6.34 6.34 0 0 0-5.32 6.27 6.34 6.34 0 1 0 11.45-3.87 8.3 8.3 0 0 0 4.08 1.1v-3.61a4.8 4.8 0 0 1-1.1-.4z"/>
          </svg>
        )
      };
    case 'YouTube':
      return {
        name: 'YouTube',
        badgeBg: 'bg-red-600 text-white border-red-700',
        textColor: 'text-red-600',
        hoverBg: 'hover:bg-red-600 hover:text-white',
        borderColor: 'border-red-300',
        icon: (cls = "w-4 h-4") => (
          <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        )
      };
    case 'Twitch':
      return {
        name: 'Twitch',
        badgeBg: 'bg-purple-700 text-white border-purple-800',
        textColor: 'text-purple-700',
        hoverBg: 'hover:bg-purple-700 hover:text-white',
        borderColor: 'border-purple-300',
        icon: (cls = "w-4 h-4") => (
          <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.571 4.714h1.715v5.143h-1.715zm4.715 0h1.714v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
          </svg>
        )
      };
    case 'Facebook':
      return {
        name: 'Facebook',
        badgeBg: 'bg-blue-600 text-white border-blue-700',
        textColor: 'text-blue-600',
        hoverBg: 'hover:bg-blue-600 hover:text-white',
        borderColor: 'border-blue-300',
        icon: (cls = "w-4 h-4") => (
          <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )
      };
    case 'Kick':
      return {
        name: 'Kick',
        badgeBg: 'bg-emerald-600 text-white border-emerald-500',
        textColor: 'text-emerald-600',
        hoverBg: 'hover:bg-emerald-600 hover:text-white',
        borderColor: 'border-emerald-300',
        icon: (cls = "w-4 h-4") => (
          <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h6v4.5L13.5 3H19l-6 6 6.5 12H14l-5-9V21H3V3z"/>
          </svg>
        )
      };
    case 'Podcast':
    default:
      return {
        name: platform || 'Social',
        badgeBg: 'bg-slate-800 text-blue-400 border-slate-700',
        textColor: 'text-slate-800',
        hoverBg: 'hover:bg-slate-800 hover:text-white',
        borderColor: 'border-slate-300',
        icon: (cls = "w-4 h-4") => (
          <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        )
      };
  }
};

export const SocialPlatformIcon: React.FC<SocialPlatformIconProps> = ({
  platform,
  size = 'md',
  showLabel = false,
  followers,
  url,
  className = '',
}) => {
  const meta = getSocialPlatformMeta(platform);

  const iconSizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const currentIconSize = iconSizeMap[size] || 'w-4 h-4';

  const content = (
    <span className={`inline-flex items-center gap-1.5 transition-all ${className}`}>
      <span className="shrink-0">{meta.icon(currentIconSize)}</span>
      {showLabel && <span className="font-bold">{meta.name}</span>}
      {followers && <span className="font-mono text-[11px] opacity-90">({followers})</span>}
    </span>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        title={`Abrir perfil de ${meta.name} en pestaña nueva`}
        className={`inline-flex items-center justify-center p-1.5 rounded-lg border transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${meta.badgeBg}`}
      >
        {content}
      </a>
    );
  }

  return content;
};
