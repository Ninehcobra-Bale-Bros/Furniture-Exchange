import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';
import { EnvEnum } from 'src/common/enums/env.enum';

class EnvironmentVariables {
  @IsEnum(EnvEnum)
  NODE_ENV: EnvEnum;

  @IsNumber()
  PORT: number;
}

const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};

export default validate;
