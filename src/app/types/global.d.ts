declare namespace JSX {
    interface IntrinsicElements {
      'lr-config': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        pubkey: string;
        'ctx-name': string;
      };
      'lr-file-uploader-regular': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'ctx-name': string;
        'css-src'?: string;
        class?: string;
      };
      'lr-upload-ctx-provider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'ctx-name': string;
        ref?: React.Ref<any>;
      };
    }
  }
  