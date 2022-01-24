import { Box, CardMedia, Typography } from "@mui/material";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import DropzoneIcon from "../../assets/img/dropzone-icon.svg";

const dropzoneContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "350px",
  padding: "1rem",
  borderWidth: 2,
  borderRadius: 4,
  borderColor: "#58E997",
  borderStyle: "dashed",
  backgroundColor: "#fff",
  textAlign: "center",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#58E997",
};

const acceptStyle = {
  borderColor: "#FB8500",
};

const rejectStyle = {
  borderColor: "#E10050",
};

export interface ImageDropzoneProps {
  preview: string;
  filename: string;
}

export default function ImageDropzone() {
  const [image, setImage] = useState<ImageDropzoneProps>();

  const onDropAccepted = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length !== 1) {
      console.log("Não foi possível carregar a imagem!");
    }
    const file = acceptedFiles[0];
    setImage(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        filename: file.name,
      })
    );
  }, []);

  useEffect(() => {
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
  }, [image]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxSize: 2000000,
    onDropAccepted: onDropAccepted,
    multiple: false,
  });

  const style: DropzoneRootProps = useMemo(
    () => ({
      ...dropzoneContainerStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      {image && (
        <CardMedia
          component="img"
          image={image.preview}
          alt={image.filename}
          sx={{
            padding: (theme) => theme.spacing(2),
            paddingBottom: 0,
          }}
        />
      )}
      {!image && (
        <Box {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <img
            src={DropzoneIcon}
            alt="Arraste e solte imagens"
            height="48px"
            style={{ marginBottom: "1rem" }}
          />
          {!isDragActive && (
            <Typography>Arraste ou aperte para escolher uma imagem</Typography>
          )}
          {isDragAccept && (
            <Typography>Arraste a imagem e solte aqui</Typography>
          )}
          {isDragReject && <Typography>Arquivo não suportado</Typography>}
        </Box>
      )}
    </>
  );
}
