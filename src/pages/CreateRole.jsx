import WithLayout from "@/components/layout/WithLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import RButton from "@/components/ui/rButton";
import RInput from "@/components/ui/rInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { produce } from "immer";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";

const initialRoleObject = () => {
  return {
    id: 0,
    name: "",
    description: "",
    permissions: [
      {
        id: 0,
        type: "checklist",
        name: "checklist",
        actions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 1,
        type: "onboarding",
        name: "onboarding",
        actions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
        pages:[
          {
            id: 1,
            type: "dashboard",
            name: "dashboard",
            actions: {
              create: false,
          read: false,
          update: false,
          delete: false,
            },
          },
          {
            id:2,
            type: "Customer onboarding",
            name: "Customer onboarding",
            actions : {
              create: false,
              read: false,
              update: false,
              delete: false,
            },
          },
        ],
      },
      {
        id: 2,
        type: "sales",
        name: "sales",
        actions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
        pages:[
          {
            id: 1,
            type: "dashboard",
            name: "dashboard",
            actions: {
              create: false,
          read: false,
          update: false,
          delete: false,
            },
          },
          {
            id:2,
            type: "lead management",
            name: "lead management",
            actions : {
              create: false,
          read: false,
          update: false,
          delete: false,
            },
          },
        ],
      },
      {
        id: 3,
        type: "compliance",
        name: "compliance",
        actions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
        pages:[
          {
            id: 1,
            type: "dashboard",
            name: "dashboard",
            actions: {
              create: false,
          read: false,
          update: false,
          delete: false,
            },
          },
          {
            id:2,
            type: "compliance",
            name: "compliance",
            actions : {
              create: false,
          read: false,
          update: false,
          delete: false,
            },
          },
          {
            id:3,
            type: "manage checklist",
            name: "manage checklist",
            actions : {
              create: false,
          read: false,
          update: false,
          delete: false,
            },
          },
        ],
      },
      {
        id: 4,
        type: "customer",
        name: "customer",
        actions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
    ],
  };
};

function CreateRole() {
  const navigate = useNavigate();

  const [role, setRole] = useState(() => ({
    ...initialRoleObject(),
  }));

  const goBack = () => {
    navigate("/roles"); 
  };
  
  const handleChange = (name, section, entity, action) => (event) => {
    const nextState = produce(role, (draft) => {
      if (name === "permissions") {
        const [mainEntity, subEntity] = entity.split(" - ");
        const mainIndex = draft.permissions.findIndex(
          (p) => p.type === section && p.name === mainEntity
        );
  
        if (mainIndex !== -1) {
          if (subEntity) {
            const pageIndex = draft.permissions[mainIndex].pages.findIndex(
              (page) => page.name === subEntity
            );
            if (pageIndex !== -1) {
              draft.permissions[mainIndex].pages[pageIndex].actions[action] = event;
            }
          } else {
            draft.permissions[mainIndex].actions[action] = event;
          }
        }
      }
    });
  
    setRole(nextState);
  };

  const saveRole = async () => {
    // Implement your save logic here
    console.log("Saving role:", role);
    return { status: "success" };
  };

  const updateRole = async () => {
    // Implement your update logic here
    console.log("Updating role:", role);
    return { status: "success" };
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (role.id === 0) {
        response = await saveRole(role);
      } else {
        response = await updateRole(role.id, role);
      }
      if (response.status === "success") {
        navigate("/role");
        setRole(initialRoleObject());
        toast({
          title: "Role saved successfully",
          description: "Role has been saved successfully.",
        });
        navigate("/role");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Unable to save role.",
        });
      }
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        let newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        // Handle errors here (e.g., set them in state to display to the user)
      }
    }
  };

  const PermissionRow = ({ section, entity, permissions }) => (
    <TableRow key={entity}>
      <TableCell>{entity.charAt(0).toUpperCase() + entity.slice(1)}</TableCell>
      <TableCell>
        <Checkbox
          id={`${section}-${entity}-create`}
          onCheckedChange={handleChange(
            "permissions",
            section,
            entity,
            "create"
          )}
          checked={permissions.create}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          id={`${section}-${entity}-read`}
          onCheckedChange={handleChange("permissions", section, entity, "read")}
          checked={permissions.read}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          id={`${section}-${entity}-update`}
          onCheckedChange={handleChange(
            "permissions",
            section,
            entity,
            "update"
          )}
          checked={permissions.update}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          id={`${section}-${entity}-delete`}
          onCheckedChange={handleChange(
            "permissions",
            section,
            entity,
            "delete"
          )}
          checked={permissions.delete}
        />
      </TableCell>
    </TableRow>
  );

  PermissionRow.propTypes = {
    section: PropTypes.string.isRequired,
    entity: PropTypes.string.isRequired,
    permissions: PropTypes.object.isRequired,
  };

  const PermissionSection = ({ title, section, permissions }) => (
    <AccordionItem value={title} key={section}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pages</TableHead>
              <TableHead>Create</TableHead>
              <TableHead>Read</TableHead>
              <TableHead>Update</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {permissions.map((permission) => (
  <>
    <PermissionRow
      key={permission.name}
      section={section}
      entity={permission.name}
      permissions={permission.actions}
    />
    {permission.pages &&
      permission.pages.map((page) => (
        <PermissionRow
          key={`${permission.name}-${page.name}`}
          section={section}
          entity={`${permission.name} - ${page.name}`}
          permissions={page.actions}
        />
      ))}
  </>
))}

          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );

  PermissionSection.propTypes = {
    title: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    permissions: PropTypes.array.isRequired,
  };

  const permissionTypes = Array.from(
    new Set(role.permissions.map((perm) => perm.type))
  );

  return (
    <div className="w-full p-4
     max-w-4xl">
      <div>
        <h1 className="mb-6 mt-2 text-xl font-bold ">Create New Role</h1>
      </div>
      <div className="space-y-2">
        <Card className="bg-gray-200  ">
          <CardContent className="p-4 gap-4">
            {" "}
            <RInput
              label="Role Name"
              id="name"
              type="text"
              placeholder="Enter Role Name"
              className="w-full "
              onChange={(event) => handleChange("name")(event)}
              value={role.name}
              isRequired
            />
            <RInput
              label="Description"
              id="description"
              type="text"
              placeholder="Enter Description"
              className="w-full"
              onChange={(event) => handleChange("description")(event)}
              value={role.description}
              isRequired
            />
          </CardContent>
        </Card>

        <div className="text-xl font-bold pt-7">Permissions</div>
        <div className="text-sm text-gray-500 pt-2">
          Manage the permissions for your application. Adjust the API and UI
          access levels as needed.
        </div>
      </div>

      <div>
        <Accordion type="single" collapsible>
          {permissionTypes.map((type) => (
            <PermissionSection
              key={type}
              title={type.toUpperCase()}
              section={type}
              permissions={role.permissions.filter((p) => p.type === type)}
            />
          ))}
        </Accordion>
      </div>
      <div className="flex justify-end mt-10">
      <RButton variant="outline" onClick={goBack}>
    Back
  </RButton>
        <RButton className="ml-5" onClick={handleSubmit}>Submit</RButton>
      </div>
    </div>
  );
}

export default WithLayout("admin")(CreateRole);
