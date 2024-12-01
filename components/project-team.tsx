import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamMembers = [
  { id: 1, name: 'John Doe', role: 'Project Manager', avatar: '/placeholder.svg?height=50&width=50', email: 'john.doe@example.com', phone: '+1 234 567 890' },
  { id: 2, name: 'Jane Smith', role: 'Lead Engineer', avatar: '/placeholder.svg?height=50&width=50', email: 'jane.smith@example.com', phone: '+1 234 567 891' },
  { id: 3, name: 'Mike Johnson', role: 'Architect', avatar: '/placeholder.svg?height=50&width=50', email: 'mike.johnson@example.com', phone: '+1 234 567 892' },
  { id: 4, name: 'Sarah Brown', role: 'Environmental Specialist', avatar: '/placeholder.svg?height=50&width=50', email: 'sarah.brown@example.com', phone: '+1 234 567 893' },
  { id: 5, name: 'Tom Wilson', role: 'Safety Officer', avatar: '/placeholder.svg?height=50&width=50', email: 'tom.wilson@example.com', phone: '+1 234 567 894' },
  // Add more team members as needed
]

export default function ProjectTeam() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {teamMembers.map((member) => (
        <HoverCard key={member.id}>
          <HoverCardTrigger asChild>
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{member.role}</p>
              </CardContent>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{member.name}</h4>
                <p className="text-sm">{member.role}</p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    {member.email}<br />
                    {member.phone}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}

