import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, Matches } from 'class-validator';

export class PatchDoctorAvatarDto {
  @ApiProperty({
    example: '/avatars/550e8400-e29b-41d4-a716-446655440000.jpg',
    description: 'Public URL path from this app (e.g. /avatars/...) or https URL',
  })
  @IsString()
  @MaxLength(2048)
  @Matches(/^(\/avatars\/[\w.-]+|https?:\/\/.+)?$/, {
    message: 'AvatarUrl must be empty, a path under /avatars/, or an http(s) URL',
  })
  AvatarUrl: string;
}
