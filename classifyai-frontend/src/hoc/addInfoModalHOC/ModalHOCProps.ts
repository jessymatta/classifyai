export interface ModalHOCProps {
    children: React.ReactNode,
    open: boolean,
    onClose: (e: React.MouseEvent<HTMLElement>) => void;
    modalTitle: string,
    width?: string
}