"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MouseEventHandler, ReactNode, Suspense, useState } from "react";
import Link from "next/link";
import { Alert, Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ModalBaseProps {
  primaryTitle: string;
  secondaryTitle: string;
  buttonText: string;
  controlButtonText: string;
  formButtonText: string;
  mainContent: ReactNode;
  footer: ReactNode;
  isLocked?: boolean;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
  errorMsg: null | string;
}

export default function ModalBase({
  primaryTitle,
  secondaryTitle,
  controlButtonText,
  formButtonText,
  mainContent,
  footer,
  isLocked,
  onSubmit,
  isLoading,
  errorMsg,
}: ModalBaseProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen} className="rounded bg-cyan-700 px-3 py-2 text-white">
        {controlButtonText}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex h-[500px] flex-col gap-2 text-sm font-light text-neutral-500">
            {isLoading ? (
              <h2 className="flex h-full flex-row items-center justify-center text-2xl">Loading</h2>
            ) : (
              <>
                <div className="border-b border-neutral-200 py-2">
                  <h2 className="text-center font-bold uppercase">{primaryTitle}</h2>
                </div>
                <div>
                  <h3 className="p-2 pt-4 text-center font-light">{secondaryTitle}</h3>
                </div>
                {typeof errorMsg === "string" && <Alert severity="error">{errorMsg}</Alert>}
                {mainContent}
                <div className="mt-2">
                  <button
                    disabled={!!isLocked}
                    onClick={onSubmit}
                    className="w-full rounded bg-red-500 p-3 py-2 text-sm uppercase text-white disabled:cursor-not-allowed disabled:bg-neutral-400"
                  >
                    {formButtonText}
                  </button>
                </div>
                <div className="flex flex-row justify-center gap-2 py-2">{footer}</div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
