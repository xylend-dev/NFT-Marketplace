import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
  backgroundColor: "#FFFFFF",
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

export interface CreateNFTCardProps {
  name: string;
  description: string;
}

export interface ImageProps {
  preview: string;
  filename: string;
}

export default function CreateNFTCard(props: CreateNFTCardProps) {
  const [image, setImage] = useState<ImageProps>();
  const { enqueueSnackbar } = useSnackbar();

  const onDropAccepted = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles.length !== 1) {
        enqueueSnackbar("Não foi possível carregar a imagem!", {
          variant: "error",
        });
        return;
      }
      const file = acceptedFiles[0];
      setImage(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          filename: file.name,
        })
      );
    },
    [enqueueSnackbar]
  );

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

  const removeImage = () => {
    setImage(undefined);
  };

  return (
    <Card
      sx={{
        marginRight: (theme) => theme.spacing(5),
        position: "sticky",
        top: 0,
      }}
    >
      {image && (
        <Box>
          <CardMedia
            component="img"
            image={image.preview}
            alt={image.filename}
            sx={{
              padding: (theme) => theme.spacing(2),
              paddingBottom: 0,
            }}
          />
          <div onClick={() => removeImage()}>
            <HighlightOffIcon
              sx={{
                position: "absolute",
                backgroundColor: "white",
                borderRadius: "50%",
                cursor: "pointer",
                fill: (theme) => theme.palette.primary.main,
                top: (theme) => theme.spacing(1),
                right: (theme) => theme.spacing(1),
                zIndex: 2,
              }}
              fontSize="large"
            />
          </div>
        </Box>
      )}
      {!image && (
        <Box {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <img
            src={DropzoneIcon}
            alt="Arraste e solte a imagem NFT"
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
      {props.name && (
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}
