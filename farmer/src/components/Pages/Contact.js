// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Mail, Phone, MapPin, Send } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const { toast } = useToast();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast({
//       title: "Message Sent!",
//       description: "Thank you for reaching out. We'll get back to you soon.",
//     });
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-subtle">
//       {/* Hero Section */}
//       <div className="bg-gradient-hero text-white py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-5xl font-bold mb-6 animate-fade-in">
//             Get In Touch
//           </h1>
//           <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto animate-slide-up">
//             We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//           {/* Contact Form */}
//           <Card className="shadow-green hover:shadow-glow-emerald transition-all duration-300 animate-slide-up">
//             <CardHeader>
//               <CardTitle className="text-2xl text-emerald-dark">Send us a message</CardTitle>
//               <CardDescription>
//                 Fill out the form below and we'll get back to you within 24 hours.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="space-y-2">
//                   <label htmlFor="name" className="text-sm font-medium text-foreground">
//                     Name
//                   </label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Your full name"
//                     required
//                     className="border-primary/20 focus:border-primary focus:ring-primary/20"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <label htmlFor="email" className="text-sm font-medium text-foreground">
//                     Email
//                   </label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="your.email@example.com"
//                     required
//                     className="border-primary/20 focus:border-primary focus:ring-primary/20"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <label htmlFor="message" className="text-sm font-medium text-foreground">
//                     Message
//                   </label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     placeholder="Tell us how we can help you..."
//                     required
//                     rows={5}
//                     className="border-primary/20 focus:border-primary focus:ring-primary/20 resize-none"
//                   />
//                 </div>
                
//                 <Button type="submit" variant="contact" size="lg" className="w-full">
//                   <Send className="w-4 h-4 mr-2" />
//                   Send Message
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           {/* Contact Information */}
//           <div className="space-y-8 animate-fade-in">
//             <div>
//               <h2 className="text-3xl font-bold text-emerald-dark mb-6">
//                 Contact Information
//               </h2>
//               <p className="text-muted-foreground mb-8">
//                 Reach out to us through any of these channels. We're here to help and answer any questions you might have.
//               </p>
//             </div>

//             <div className="space-y-6">
//               <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-green">
//                 <CardContent className="flex items-center space-x-4 p-6">
//                   <div className="bg-gradient-primary p-3 rounded-full">
//                     <Mail className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-emerald-dark">Email</h3>
//                     <p className="text-muted-foreground">hello@company.com</p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-green">
//                 <CardContent className="flex items-center space-x-4 p-6">
//                   <div className="bg-gradient-primary p-3 rounded-full">
//                     <Phone className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-emerald-dark">Phone</h3>
//                     <p className="text-muted-foreground">+1 (555) 123-4567</p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-green">
//                 <CardContent className="flex items-center space-x-4 p-6">
//                   <div className="bg-gradient-primary p-3 rounded-full">
//                     <MapPin className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-emerald-dark">Address</h3>
//                     <p className="text-muted-foreground">
//                       123 Business Street<br />
//                       Suite 100<br />
//                       City, State 12345
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Office Hours */}
//             <Card className="bg-gradient-subtle border-primary/20">
//               <CardHeader>
//                 <CardTitle className="text-emerald-dark">Office Hours</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Monday - Friday</span>
//                   <span className="font-medium">9:00 AM - 6:00 PM</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Saturday</span>
//                   <span className="font-medium">10:00 AM - 4:00 PM</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Sunday</span>
//                   <span className="font-medium">Closed</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;