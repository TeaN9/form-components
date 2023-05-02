import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormProvider,
  FTextField,
  FCheckbox,
  FMultiCheckbox,
  FRadioGroup,
  FSelect,
  FSwitch,
} from "./components/form/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

function LogInForm() {
  const defaultValues = {
    username: "",
    email: "Abc@gmail.vn",
    password: "123@",
    remember: true,
    purpose: [],
    gender: [],
    isLearning: false,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // setError("afterSubmit", { message: "Server Response Error" });
  };
  return (
    <div>
      <Typography variant="h3" textAlign="center" mb={3}>
        LOG IN
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <FTextField name="username" label="Username" />
          <FTextField name="email" label="Email address" />

          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FMultiCheckbox name="purpose" options={["Student", "Worker"]} />
          <FRadioGroup name="gender" options={["Male", "Female"]} />
          <FSelect name="country" label="Country">
            {[
              { code: "VNM", label: "Vietnam" },
              { code: "CAM", label: "Cambodia" },
            ].map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </FSelect>

          <FSwitch name="isLearning" label="is Learning" />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 3 }}
        >
          <FCheckbox name="remember" label="Remember me" />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </div>
  );
}

export default LogInForm;
