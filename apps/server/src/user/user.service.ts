import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { UpdateEmailDto, UpdatePasswordDto } from './dto';
import * as argon from "argon2"
import { getUsers } from '@server/types';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService
    ) {}

    async update(dto: UpdateEmailDto | UpdatePasswordDto, prop: string, email: string): Promise<void> {
        try{
            if(prop === "email" && this.isUpdateEmailDto(dto)){
                const updateUser = await this.prisma.user.update({
                    where: {
                        email: email
                    },
                    data : {
                        email: dto.email
                    }
                })
    
                if(!updateUser) throw new InternalServerErrorException("Errore nel cambio della mail");
            }else if(prop === "password" && this.isUpdatePasswordDto(dto)){
                const user = await this.prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })
    
                if(!user) throw new InternalServerErrorException("Errore user inesistente");
    
                const pwMatch = await argon.verify(user.hashPW, dto.password)
    
                if(pwMatch) throw new InternalServerErrorException("La nuova password deve essere diversa da quella precedente");
                
                const hash = await argon.hash(dto.password)

                await this.prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        hashPW: hash
                    }
                })
            }
        }catch(err){
            throw new InternalServerErrorException("Errore nell'elaborazione")
        }
    }

    private isUpdateEmailDto(dto: any): dto is UpdateEmailDto {
        return (dto as UpdateEmailDto).email !== undefined;
    }
    
    private isUpdatePasswordDto(dto: any): dto is UpdatePasswordDto {
        return (dto as UpdatePasswordDto).password !== undefined;
    }

    async getAllUser(): Promise<{ users: getUsers[]}> {
        try{
            const candidateEmails = await this.getCandidateEmails();

            const users = await this.prisma.user.findMany({
                select: {
                    userId: true,
                    nome: true,
                    cognome: true,
                    email: true,
                    ruolo: true
                }
            })

            if(!users) throw new ForbiddenException("Nessun user trovato");

            const usersWithCandidateFlag = users.map(user => ({
                ...user,
                isCandidato: candidateEmails.includes(user.email)
            }));
    
            return { users: usersWithCandidateFlag };
        }catch(err){
            throw new InternalServerErrorException("Errore nella ricerca degli utenti")
        }
    }

    private async getCandidateEmails(): Promise<string[]> {
        const candidates = await this.prisma.candidati.findMany({
            select: {
                email: true
            }
        });
    
        return candidates.map(candidate => candidate.email);
    }

    async fireUser(id: string): Promise<void> {
        try{
            await this.prisma.user.update({
                where: {
                    userId: id
                },
                data: {
                    ruolo: "UTENTE"
                }
            })
        }catch(err){
            throw new InternalServerErrorException("Errore nell'elaborazione dei dati")
        }
    }

    async hireUser(id:string): Promise<void> {
        try{
            const user = await this.prisma.user.update({
                where: {
                    userId: id
                },
                data: {
                    ruolo: "ADMIN"
                }
            })

            await this.prisma.candidati.delete({
                where: {
                    email: user.email
                }
            })
        }catch(err){
            throw new InternalServerErrorException("Errore nell'elaborazione dei dati")
        }
    }

    async check(email: string): Promise<{ isCandidate: boolean }> {
        try{
            const candidateEmails = await this.getCandidateEmails();
            return { isCandidate: candidateEmails.includes(email)}
        }catch(err){
            throw new InternalServerErrorException("Errore nel controllo")
        }
    }

    async candidatura(dto: UpdateEmailDto): Promise<void> {
        try{
            await this.prisma.candidati.create({
                data: {
                    email: dto.email
                }
            })
        }catch(err){
            throw new InternalServerErrorException("Errore nella candidatura")
        }
    }
}
